/datum/computer/file/robotics_analysis_data
	name = "robotics analysis data"
	extension = "RAD"
	size = 8
	/// Associated analysis data; multiple files may reference the same underlying data
	var/datum/robotics_analysis/analysis_data = null

/datum/computer/file/robotics_analysis_data/asText()
	if (isnull(src.analysis_data))
		return "????-????: ? / ?|n"
	return "[src.analysis_data.id]: [src.analysis_data.data] / [src.analysis_data.maximum_data]|n"

/datum/computer/file/robotics_analysis_data/copy_file()
	var/datum/computer/file/robotics_analysis_data/new_file = ..()
	if (!isnull(new_file) && !isnull(src.analysis_data))
		new_file.analysis_data.link_file(new_file)
	return new_file

/datum/computer/file/robotics_analysis_data/disposing()
	if (!isnull(src.analysis_data))
		src.analysis_data.unlink_file(src)
		src.analysis_data = null
	. = ..()
