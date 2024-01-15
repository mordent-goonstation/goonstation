#define ROBOT_ANALYSIS_MULT 1

/datum/lifeprocess/robot_analysis
	proc/get_target_file()
		if (!src.robot_owner)
			return
		var/obj/item/disk/data/target_disk = src.robot_owner.part_chest?.disk
		if (!target_disk)
			return
		// find first non-full file (if any)
		for (var/datum/computer/file/robotics_analysis/scan_file in target_disk.root.contents)
			if (scan_file.data >= scan_file.maximum_data)
				continue
			return scan_file
		// create new file
		var/datum/computer/file/robotics_analysis/created_file = new
		var/suc = target_disk.root.add_file(created_file)
		if (suc)
			return created_file

	process(datum/gas_mixture/environment)
		if (src.robot_owner)
			// TODO (robo-research): is unactive (client?) - reduce gain rate or remove entirely
			var/datum/computer/file/robotics_analysis/target_file = get_target_file()
			if (target_file)
				target_file.add_data(ROBOT_ANALYSIS_MULT * src.get_multiplier())
		..()

#undef ROBOT_ANALYSIS_MULT
