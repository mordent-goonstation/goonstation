ADMIN_INTERACT_PROCS(/obj/item/robot_module, proc/admin_add_tool, proc/admin_remove_tool)

/// Job/tool modules for cyborgs
/obj/item/robot_module
	name = "blank cyborg module"
	desc = "A blank cyborg module. It has minimal function in its current state."
	icon = 'icons/obj/items/cyborg_parts/modules.dmi'
	icon_state = "blank"
	inhand_image_icon = 'icons/mob/inhand/hand_tools.dmi'
	item_state = "electronic"
	w_class = W_CLASS_SMALL
	flags = FPRINT | TABLEPASS | CONDUCT
	var/list/obj/item/tools = null
	var/mod_hudicon = "unknown"
	var/cosmetic_mods = null
	var/included_cosmetic = null
	var/initial_tools = /datum/robot/module_tool_creator/recursive/module/common
	var/radio_type = null
	var/obj/item/device/radio/headset/radio = null
	var/list/mailgroups = list(MGO_SILICON, MGD_PARTY)
	var/list/alertgroups = list(MGA_MAIL, MGA_RADIO, MGA_DEATH)

/obj/item/robot_module/New()
	..()
	src.tools = list()
	src.append_tools(src.initial_tools)

	if (ispath(src.included_cosmetic, /datum/robot_cosmetic))
		src.cosmetic_mods = new included_cosmetic(src)

	if (src.radio_type != null)
		src.radio = new src.radio_type(src)

// handle various ways of adding tools to the module
/obj/item/robot_module/proc/append_tools(appending_tools)
	if (isnull(appending_tools))
		return
	if (istype(appending_tools, /obj/item))
		// handle adding single instance of tool
		var/obj/item/I = appending_tools
		I.cant_drop = TRUE
		I.set_loc(src)
		src.tools += I
		return I
	if (ispath(appending_tools, /obj/item))
		// handle adding tool by path (instantiate)
		var/obj/item/I = new appending_tools(src)
		// recurse here to avoid duplication; could optimize this call out
		return src.append_tools(I)
	if (istype(appending_tools, /datum/robot/module_tool_creator))
		// handle adding by definition
		var/datum/robot/module_tool_creator/MTC = appending_tools
		var/I = MTC.apply_to_module(src)
		return I
	if (ispath(appending_tools, /datum/robot/module_tool_creator))
		// handle adding by definition path (instantiate)
		var/datum/robot/module_tool_creator/MTC = new appending_tools
		// recurse here to avoid duplication; could optimize this call out
		return src.append_tools(MTC)
	if (islist(appending_tools))
		// handle adding a batch at once
		var/list/L = appending_tools
		var/list/added = list()
		for (var/member in L)
			var/resolved_member = src.append_tools(member)
			if (!isnull(resolved_member))
				// N.B. this will flatten lists, which is desired behavior here
				added += resolved_member
		return added

/// Admin interact menu for adding tools to the module
/obj/item/robot_module/proc/admin_add_tool()
	set name = "Add Tool"
	var/type = get_one_match(tgui_input_text(usr, "Item type", "Item type"), /obj/item)
	if (!type)
		return
	var/obj/item/I = new type(src)
	src.append_tools(I)
	boutput(usr, "Added [I] to [src].")

/// Admin interact menu for removing tools from the module
/obj/item/robot_module/proc/admin_remove_tool()
	set name = "Remove Tool"
	var/obj/item/I = tgui_input_list(usr, "Tool to remove", "Tool to remove", src.tools)
	if (!I)
		return
	src.tools -= I
	qdel(I)
	boutput(usr, "Removed [I] from [src].")
