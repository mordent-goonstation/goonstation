/obj/machinery/computer/robot_module_rewriter
	name = "cyborg module rewriter"
	desc = "A machine used to reconfigure cyborg modules."
	icon_state = "robot_module_rewriter"
	anchored = ANCHORED
	density = 1
	light_r = 1
	light_g = 0.4
	light_b = 0
	circuit_type = /obj/item/circuitboard/robot_module_rewriter
	var/obj/item/robot_module/inserted_module = null

/obj/machinery/computer/robot_module_rewriter/attackby(obj/item/I, mob/user)
	if (istype(I, /obj/item/robot_module))
		src.change_inserted_module(I, user)
		tgui_process.update_uis(src)
		return
	else
		..()

/obj/machinery/computer/robot_module_rewriter/Exited(atom/movable/I)
	. = ..()
	if (istype(I, /obj/item/robot_module))
		src.inserted_module = null

/obj/machinery/computer/robot_module_rewriter/ui_interact(mob/user, datum/tgui/ui)
	ui = tgui_process.try_update_ui(user, src, ui)
	if (!ui)
		ui = new(user, src, "CyborgModuleRewriter", src.name)
		ui.open()

/obj/machinery/computer/robot_module_rewriter/ui_data(mob/user)
	. = ..()
	.["insertedModule"] = src.module_ui_data()
	// .["disk"] = src.disk_ui_data()

/obj/machinery/computer/robot_module_rewriter/proc/module_ui_data()
	if (!src.inserted_module)
		return null
	var/list/moduleToolsData = list()
	for (var/obj/item/tool in src.inserted_module.tools)
		var/alist/toolData = alist(
			"name" = tool.name,
			"itemRef" = "\ref[tool]"
		)
		// wrapping in a list to append actual alist rather than blend contents
		moduleToolsData += list(toolData)
	. = alist(
		"name" = src.inserted_module.name,
		"itemRef" = "\ref[src.inserted_module]",
		"tools" = moduleToolsData
	)

/*
/obj/machinery/computer/robot_module_rewriter/proc/disk_ui_data()
	if (!src.inserted_disk)
		return null
	// get data for root-level files
	var/list/diskFilesData = list()
	var/datum/computer/folder/root = src.inserted_disk.root
	for (var/datum/computer/entity in root.contents)
		var/datum/computer/file/fileEntity = entity
		var/datum/computer/file/robotics_analysis_data/radEntity = entity
		var/alist/entityData = alist(
			"name" = entity.name,
			"item_ref" = "\ref[entity]",
			"size" = entity.size,
			"extension" = istype(fileEntity) ? fileEntity.extension : null,
			"rad_data" = istype(radEntity) && !isnull(radEntity.analysis_data) ? radEntity.analysis_data.get_ui_data() : null
		)
		diskFilesData += entityData
	. = alist(
		"name" = src.inserted_disk.name,
		"item_ref" = "\ref[src.inserted_disk]",
		"files" = diskFilesData
	)
*/

/obj/machinery/computer/robot_module_rewriter/ui_act(action, list/params, datum/tgui/ui)
	. = ..()
	if (.)
		return

	var/mob/user = ui.user

	switch (action)

		if ("ejectModule")
			if (BOUNDS_DIST(ui.user, src) || isintangible(ui.user))
				return
			. = src.change_inserted_module(null, user)
			return
		if ("changeInsertedModule")
			if (BOUNDS_DIST(ui.user, src) || isintangible(ui.user))
				return
			var/obj/item/robot_module/inserting_module = user.equipped()
			. = src.change_inserted_module(inserting_module, user)
			return

		if ("tool-move")
			var/dir = params["dir"]
			var/item_ref = params["itemRef"]
			if (!dir || !item_ref)
				return
			if (isnull(src.inserted_module))
				return
			var/obj/item/item = locate(item_ref) in src.inserted_module.tools
			if (isnull(item))
				return
			var/item_index = src.inserted_module.tools.Find(item)
			if (!item_index)
				return
			switch (dir)
				if ("down")
					if (item_index < length(src.inserted_module.tools))
						src.inserted_module.tools.Swap(item_index, item_index + 1)
				if ("up")
					if (item_index >= 2)
						src.inserted_module.tools.Swap(item_index, item_index - 1)
			. = TRUE

		if ("tool-remove")
			var/item_ref = params["itemRef"]
			if (!item_ref)
				return
			if (isnull(src.inserted_module))
				return
			var/obj/item/item = locate(item_ref) in src.inserted_module.tools
			if (isnull(item))
				return
			src.inserted_module.tools -= item
			qdel(item)
			. = TRUE

/obj/machinery/computer/robot_module_rewriter/proc/change_inserted_module(obj/item/robot_module/I, mob/user)
	. = FALSE
	if (!istype(I, /obj/item/robot_module) && isnull(src.inserted_module))
		return
	if (istype(I, /obj/item/robot_module))
		user.drop_item(I)
		I.set_loc(src)
	user.put_in_hand_or_drop(src.inserted_module)
	src.inserted_module = I
	playsound(src, 'sound/items/floppy_disk.ogg', 30, TRUE)
	. = TRUE
	return
