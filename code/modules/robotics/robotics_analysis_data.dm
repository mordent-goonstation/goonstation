/datum/robotics_analysis
	var/id
	var/data = 0
	var/maximum_data = 256
	var/consumed = FALSE
	var/list/datum/computer/file/robotics_analysis_data/linked_files = null

/datum/robotics_analysis/New()
	..()
	if (!src.id)
		// TODO: improve to obfuscate actual ref and seem more random (randomness doesn't matter)
		src.id = "\ref[src]"
	src.linked_files = list()

/datum/robotics_analysis/proc/link_file(datum/computer/file/robotics_analysis_data/file)
	src.linked_files |= file

/datum/robotics_analysis/proc/unlink_file(datum/computer/file/robotics_analysis_data/file)
	if (src.linked_files)
		src.linked_files -= file
		if (!length(src.linked_files))
			qdel(src)

/datum/robotics_analysis/proc/get_ui_data()
	return list(
		id = src.id,
		data = src.data,
		maximum_data = src.maximum_data,
		consumed = src.consumed,
	)
