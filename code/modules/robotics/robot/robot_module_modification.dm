ABSTRACT_TYPE(/datum/robot_module_modification)
/datum/robot_module_modification
	var/name = "Nothing"
	var/desc = "No modification."

/// Returns FALSE if no invalid reason, else string for first invalid reason
/datum/robot_module_modification/proc/get_module_invalid_reason(obj/item/robot_module/module)
	. = FALSE

/datum/robot_module_modification/proc/apply_to_module(obj/item/robot_module/module)
	. = null

/datum/robot_module_modification/add_omnitool
	name = "Add Omnitool"
	desc = "Adds an omnitool."
	apply_to_module(obj/item/robot_module/module)
		return module.append_tools(/obj/item/tool/omnitool)

/datum/robot_module_modification/split_omnitool
	name = "Split Omnitool"
	desc = "Breaks an omnitool into individual tools."
	get_module_invalid_reason(obj/item/robot_module/module)
		. = ..()
		if (.)
			return
		module.tools.Find()
	apply_to_module(obj/item/robot_module/module)
