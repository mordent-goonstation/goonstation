#ifdef NO_ADMIN_SPEECH_MODULES

	#define ADMIN_SPEECH_OUTPUTS null
	#define ADMIN_SPEECH_MODIFIERS null
	#define ADMIN_SPEECH_PREFIXES null
	#define ADMIN_LISTEN_INPUTS null
	#define ADMIN_LISTEN_MODIFIERS null
	#define ADMIN_LISTEN_EFFECTS null
	#define ADMIN_LISTEN_CONTROLS null
	#define ADMIN_UNDERSTOOD_LANGUAGES null

#else

	#define ADMIN_SPEECH_OUTPUTS list( \
		SPEECH_OUTPUT_BLOBCHAT, \
		SPEECH_OUTPUT_DEADCHAT_ADMIN, \
		SPEECH_OUTPUT_FLOCK_GLOBAL, \
		SPEECH_OUTPUT_GHOSTDRONE, \
		SPEECH_OUTPUT_HIVECHAT_GLOBAL, \
		SPEECH_OUTPUT_KUDZUCHAT_ADMIN, \
		SPEECH_OUTPUT_MARTIAN, \
		SPEECH_OUTPUT_SILICONCHAT_ADMIN, \
		SPEECH_OUTPUT_THRALLCHAT_GLOBAL, \
		SPEECH_OUTPUT_WRAITHCHAT_ADMIN, \
	)

	#define ADMIN_SPEECH_MODIFIERS null

	#define ADMIN_SPEECH_PREFIXES null

	#define ADMIN_LISTEN_INPUTS list( \
		LISTEN_INPUT_BLOBCHAT, \
		LISTEN_INPUT_DEADCHAT_ADMIN, \
		LISTEN_INPUT_FLOCK_GLOBAL, \
		LISTEN_INPUT_GHOSTDRONE, \
		LISTEN_INPUT_GLOBAL_HEARING, \
		LISTEN_INPUT_GLOBAL_HEARING_LOCAL_COUNTERPART, \
		LISTEN_INPUT_HIVECHAT_GLOBAL, \
		LISTEN_INPUT_KUDZUCHAT, \
		LISTEN_INPUT_MARTIAN, \
		LISTEN_INPUT_SILICONCHAT, \
		LISTEN_INPUT_THRALLCHAT_GLOBAL, \
		LISTEN_INPUT_WRAITHCHAT, \
	)

	#define ADMIN_LISTEN_MODIFIERS list( \
		LISTEN_MODIFIER_CHAT_CONTEXT_FLAGS, \
	)

	#define ADMIN_LISTEN_EFFECTS null

	#define ADMIN_LISTEN_CONTROLS null

	#define ADMIN_UNDERSTOOD_LANGUAGES list( \
		LANGUAGE_ALL, \
	)

#endif


/datum/admins
	var/name = "admins"
	var/rank = null
	var/client/owner = null
	var/tempmin = 0 // are they a tempmin?
	var/state = 1
	//state = 1 for playing : default
	//state = 2 for observing
	var/extratoggle = 0
	var/popuptoggle = 0
	var/servertoggles_toggle = 0
	var/disable_atom_verbs = 1
	var/attacktoggle = 1
	var/ghost_respawns = 1
	var/adminwho_alerts = 1
	var/rp_word_filtering = 0
	var/uncool_word_filtering = 1
	var/auto_stealth = 0
	/// toogle that determines whether or not clouddata for auto alt key and stealth is per server or global
	var/auto_alias_global_save = FALSE
	var/auto_stealth_name = null
	var/auto_alt_key = 0
	var/auto_alt_key_name = null
	var/level = 0
	var/drunk = 0 //I find adding this var pretty hilarious in itself really
	var/hear_prayers = 0 //Ok
	var/see_atags = TRUE //atags toggle
	var/audible_prayers = 0 // 0 = silent, 1 = ping, 2 = dectalk (oh god why)
	var/audible_ahelps = PM_NO_ALERT
	var/buildmode_view = 0 //change view when using buildmode?
	var/spawn_in_loc = 0 //spawn verb spawning in loc?
	/// toggles seeing the Topic log entires on or off by default
	var/show_topic_log = FALSE
	var/hide_offline_indicators = TRUE // overrides offline indicator behavior
	var/priorRank = null
	var/audit = AUDIT_ACCESS_DENIED
	var/ghost_interaction = FALSE //! if toggled on then the admin ghost can interact with things

	var/static/list/admin_interact_verbs
	var/static/list/admin_interact_atom_verbs

	var/datum/filter_editor/filteriffic = null
	var/datum/particle_editor/particool = null
	var/datum/color_matrix_editor/color_matrix_editor = null
	var/datum/centcomviewer/centcomviewer = null
	var/datum/bioeffectmanager/bioeffectmanager = null
	var/datum/abilitymanager/abilitymanager = null
	var/datum/ban_panel/ban_panel = null
	var/datum/antagonist_panel/antagonist_panel = null
	var/datum/job_manager/job_manager = null
	var/datum/region_allocator_panel/region_allocator_panel = null

	var/list/hidden_categories = null

	var/mob/respawn_as_self_mob = null
	var/skip_manifest = FALSE
	var/slow_stat = FALSE

	/// This admin holder's auxiliary speech module tree.
	var/datum/speech_module_tree/auxiliary/admin_speech_tree
	/// This admin holder's auxiliary listen module tree.
	var/datum/listen_module_tree/auxiliary/admin_listen_tree

	New(client/C)
		. = ..()

		src.owner = C
		src.admin_speech_tree = new(null, ADMIN_SPEECH_OUTPUTS, ADMIN_SPEECH_MODIFIERS, ADMIN_SPEECH_PREFIXES, src.owner.ensure_speech_tree())
		src.admin_listen_tree = new(null, ADMIN_LISTEN_INPUTS, ADMIN_LISTEN_MODIFIERS, ADMIN_LISTEN_EFFECTS, ADMIN_LISTEN_CONTROLS, ADMIN_UNDERSTOOD_LANGUAGES, src.owner.ensure_listen_tree())

		if (src.owner.preferences.listen_ooc)
			src.admin_listen_tree.AddListenInput(LISTEN_INPUT_OOC_ADMIN)

		if (src.owner.preferences.listen_looc)
			src.admin_listen_tree.AddListenControl(LISTEN_CONTROL_TOGGLE_HEARING_ALL_LOOC)

		src.hidden_categories = list()
		SPAWN(1 DECI SECOND)
			src.owner.chatOutput.getContextFlag()
			src.load_admin_prefs()

		if (!admin_interact_atom_verbs || length(admin_interact_atom_verbs) <= 0)
			admin_interact_atom_verbs = list(\
			"Spin",\
			"Rotate",\
			"Scale",\
			"Emag",\
			"Pixel Offset",\
			)

		if (!admin_interact_verbs || length(admin_interact_verbs) <= 0)
			admin_interact_verbs = list()
			admin_interact_verbs["obj"] = list(\
			"Get Thing",\
			"Follow Thing",\
			"Add Reagents",\
			"Check Reagents",\
			"View Variables",\
			"View Fingerprints",\
			"Delete",\
			"Possess",\
			"Create Poster",\
			"Copy Here",\
			"Ship to Cargo",\
			"Set Material",\
			"Say",\
			)
			admin_interact_verbs["mob"] = list(\
			"Player Options",\
			"Private Message",\
			"Subtle Message",\
			"Check Health",\
			"Heal",\
			"Stabilize",\

			"Manage Bioeffects",\
			"Manage Abilities",\
			"Manage Traits",\
			"Add Reagents",\
			"Check Reagents",\
			"View Variables",\
			"Get Thing",\
			"Follow Thing",\
			"Possess",\
			"Create Poster",\
			"Delete",\
			"Copy Here",

			"Gib",\
			"Polymorph",\
			"Modify Organs",\
			"Modify Parts",\
			"Modify Module",\
			"Swap Minds",\
			"Transfer Client To",\
			"Shamecube",\
			"Create Poster",\
			"Ship to Cargo",\
			"Set Material",\
			"Say",\
			)
			admin_interact_verbs["turf"] = list(\
			"Jump To Turf",\
			"Air Status",\
			"Check Reagents",\
			"Create Explosion",\
			"Create Fluid",\
			"Create Smoke",\
			"Create Portal",\
			"Get Telesci Coords",\

			"View Variables",\
			"View Fingerprints",\
			"Delete",\
			"Create Poster",\
			"Set Material",\
			"Say",\
			)



	proc/show_pref_window(mob/user)
		var/list/HTML = list("<html><head><title>Admin Preferences</title></head><body>")
		HTML += "<a href='byond://?src=\ref[src];action=refresh_admin_prefs'>Refresh</a></b><br>"
		HTML += "<b>Automatically Set Alternate Key?: <a href='byond://?src=\ref[src];action=toggle_auto_alt_key'>[(src.auto_alt_key ? "Yes" : "No")]</a></b><br>"
		HTML += "<b>Auto Alt Key: <a href='byond://?src=\ref[src];action=set_auto_alt_key_name'>[(src.auto_alt_key_name ? "[src.auto_alt_key_name]" : "N/A")]</a></b><br>"
		HTML += "<b>Automatically Set Stealth Mode?: <a href='byond://?src=\ref[src];action=toggle_auto_stealth'>[(src.auto_stealth ? "Yes" : "No")]</a></b><br>"
		HTML += "<b>Auto Stealth Name: <a href='byond://?src=\ref[src];action=set_auto_stealth_name'>[(src.auto_stealth_name ? "[src.auto_stealth_name]" : "N/A")]</a></b><br>"
		HTML += "<i>Note: Auto Stealth will override Auto Alt Key settings on load</i><br>"
		HTML += "<b>Use this Key / Stealth Name on all servers?: <a href='byond://?src=\ref[src];action=set_auto_alias_global_save'>[(src.auto_alias_global_save ? "Yes" : "No")]</a></b><br>"
		HTML += "<hr>"
		//if (src.owner.holder:level >= LEVEL_CODER)
			//HTML += "<b>Hide Extra Verbs?: <a href='byond://?src=\ref[src];action=toggle_extra_verbs'>[(src.extratoggle ? "Yes" : "No")]</a></b><br>"
		HTML += "<b>Hide Server Toggles Tab?: <a href='byond://?src=\ref[src];action=toggle_server_toggles_tab'>[(src.servertoggles_toggle ? "Yes" : "No")]</a></b><br>"
		HTML += "<b>Hide Atom Verbs \[old\]?: <a href='byond://?src=\ref[src];action=toggle_atom_verbs'>[(src.disable_atom_verbs ? "Yes" : "No")]</a></b><br>"
		HTML += "<b>Receive Attack Alerts?: <a href='byond://?src=\ref[src];action=toggle_attack_messages'>[(src.attacktoggle ? "Yes" : "No")]</a></b><br>"
		HTML += "<b>Receive Ghost respawn offers?: <a href='byond://?src=\ref[src];action=toggle_ghost_respawns'>[(src.ghost_respawns ? "Yes" : "No")]</a></b><br>"
		HTML += "<b>Receive Who/Adminwho alerts?: <a href='byond://?src=\ref[src];action=toggle_adminwho_alerts'>[(src.adminwho_alerts ? "Yes" : "No")]</a></b><br>"
		HTML += "<b>Receive Alerts For \"Low RP\" Words?: <a href='byond://?src=\ref[src];action=toggle_rp_word_filtering'>[(src.rp_word_filtering ? "Yes" : "No")]</a></b><br>"
		HTML += "<b>Receive Alerts For Uncool Words?: <a href='byond://?src=\ref[src];action=toggle_uncool_word_filtering'>[(src.uncool_word_filtering ? "Yes" : "No")]</a></b><br>"
		HTML += "<b>See Prayers?: <a href='byond://?src=\ref[src];action=toggle_hear_prayers'>[(src.hear_prayers ? "Yes" : "No")]</a></b><br>"
		HTML += "<b>Audible Prayers?: <a href='byond://?src=\ref[src];action=toggle_audible_prayers'>[list("No", "Yes", "Dectalk")[src.audible_prayers + 1]]</a></b><br>"
		HTML += "<b>Audible Admin Helps?: <a href='byond://?src=\ref[src];action=toggle_audible_ahelps'>[src.audible_ahelps ? (src.audible_ahelps == PM_DECTALK_ALERT ? "Dectalk" : "Yes") : "No"]</a></b><br>"
		HTML += "<b>Hide ATags?: <a href='byond://?src=\ref[src];action=toggle_atags'>[(src.see_atags ? "No" : "Yes")]</a></b><br>"
		HTML += "<b>Change view when using buildmode?: <a href='byond://?src=\ref[src];action=toggle_buildmode_view'>[(src.buildmode_view ? "No" : "Yes")]</a></b><br>"
		HTML += "<b>Spawn verb spawns in your loc?: <a href='byond://?src=\ref[src];action=toggle_spawn_in_loc'>[(src.spawn_in_loc ? "Yes" : "No")]</a></b><br>"
		HTML += "<b>Show Topic log?: <a href='byond://?src=\ref[src];action=toggle_topic_log'>[(src.show_topic_log ? "Yes" : "No")]</a></b><br>"
		HTML += "<b>Don't create manifest entries when respawning?: <a href='byond://?src=\ref[src];action=toggle_skip_manifest'>[(src.skip_manifest ? "Yes" : "No")]</a></b><br>"
		HTML += "<b>Hide offline indicators when mob jumping?: <a href='byond://?src=\ref[src];action=toggle_hide_offline'>[(src.hide_offline_indicators ? "Yes" : "No")]</a></b><br>"
		HTML += "<b>Slow down Stat panel update speed to non-admin speed?: <a href='byond://?src=\ref[src];action=toggle_slow_stat'>[(src.slow_stat ? "Yes" : "No")]</a></b><br>"
		HTML += "<hr>"
		for(var/cat in toggleable_admin_verb_categories)
			HTML += "<b>Hide [cat] verbs?: <a href='byond://?src=\ref[src];action=toggle_category;cat=[cat]'>[(cat in src.hidden_categories) ? "Yes" : "No"]</a></b><br>"
		HTML += "<hr><b><a href='byond://?src=\ref[src];action=load_admin_prefs'>LOAD</a></b> | <b><a href='byond://?src=\ref[src];action=save_admin_prefs'>SAVE</a></b>"
		HTML += "</body></html>"

		user.Browse(HTML.Join(),"window=aprefs;size=385x540")

	proc/load_admin_prefs()
		var/list/AP

		UNTIL(owner.player?.cloudSaves.loaded, 10 SECONDS)
		var/json_data = owner.player?.cloudSaves.getData("admin_preferences")
		if (json_data)
			AP = json_decode(json_data)
		else
			boutput(src.owner, SPAN_NOTICE("ERROR: Admin preference data is null. You either have no saved prefs or cloud is unreachable."))
			return

		var/saved_servertoggles_toggle = AP["servertoggles_toggle"]
		if (isnull(saved_servertoggles_toggle))
			saved_servertoggles_toggle = 0
		if (saved_servertoggles_toggle == 1 && servertoggles_toggle != 1)
			src.owner.toggle_server_toggles_tab()
		servertoggles_toggle = saved_servertoggles_toggle

		//yes the var name makes no sense, but I'm not resetting everyone's prefs for it
		var/saved_disable_atom_verbs = AP["animtoggle"]
		if (isnull(saved_disable_atom_verbs))
			saved_disable_atom_verbs = 1
		if (saved_disable_atom_verbs == 0 && disable_atom_verbs != 0)
			src.owner.toggle_atom_verbs()
		disable_atom_verbs = saved_disable_atom_verbs

		var/saved_attacktoggle = AP["attacktoggle"]
		if (isnull(saved_attacktoggle))
			saved_attacktoggle = 1
		if (saved_attacktoggle == 0 && attacktoggle != 0)
			src.owner.toggle_attack_messages()
		attacktoggle = saved_attacktoggle

		var/saved_toggle_ghost_respawns = AP["ghost_respawns"]
		if (isnull(saved_toggle_ghost_respawns))
			saved_toggle_ghost_respawns = 1
		if (saved_toggle_ghost_respawns == 0 && ghost_respawns != 0)
			src.owner.toggle_ghost_respawns()
		ghost_respawns = saved_toggle_ghost_respawns

		var/saved_adminwho_alerts = AP["adminwho_alerts"]
		if (isnull(saved_adminwho_alerts))
			saved_adminwho_alerts = 1
		if (saved_adminwho_alerts == 0 && adminwho_alerts != 0)
			src.owner.toggle_adminwho_alerts()
		adminwho_alerts = saved_adminwho_alerts

		var/saved_rp_word_filtering = AP["rp_word_filtering"]
		if (isnull(saved_rp_word_filtering))
			saved_rp_word_filtering = 0
		if (saved_rp_word_filtering == 1 && rp_word_filtering != 1)
			src.owner.toggle_rp_word_filtering()
		rp_word_filtering = saved_rp_word_filtering

		var/saved_uncool_word_filtering = AP["uncool_word_filtering"]
		if (isnull(saved_uncool_word_filtering))
			saved_uncool_word_filtering = 1
		if (saved_uncool_word_filtering == 0 && uncool_word_filtering != 0)
			src.owner.toggle_uncool_word_filtering()
		else
			src.RegisterSignal(GLOBAL_SIGNAL, COMSIG_GLOBAL_UNCOOL_PHRASE, PROC_REF(admin_message_to_me))
		uncool_word_filtering = saved_uncool_word_filtering

		var/saved_auto_alias_global_save = AP["auto_alias_global_save"]
		if (isnull(saved_auto_alias_global_save))
			saved_auto_alias_global_save = FALSE
		auto_alias_global_save = saved_auto_alias_global_save

		var/list/saved_auto_aliases = AP["auto_aliases"]
		if (!saved_auto_aliases)
			saved_auto_aliases = list()

		var/saved_auto_stealth = saved_auto_aliases["[src.auto_alias_global_save ? "" : "[config.server_id]_"]auto_stealth"]
		var/saved_auto_stealth_name = saved_auto_aliases["[auto_alias_global_save ? "" : "[config.server_id]_"]auto_stealth_name"]
		if (isnull(saved_auto_stealth) || !isnum(saved_auto_stealth))
			saved_auto_stealth = 0
			saved_auto_stealth_name = null
		if (saved_auto_stealth == 1 && auto_stealth != 1 && !isnull(saved_auto_stealth_name))
			auto_stealth = 1
			src.set_stealth_mode(saved_auto_stealth_name, 1)
		auto_stealth = saved_auto_stealth
		auto_stealth_name = saved_auto_stealth_name

		var/saved_auto_alt_key = saved_auto_aliases["[auto_alias_global_save ? "" : "[config.server_id]_"]auto_alt_key"]
		var/saved_auto_alt_key_name = saved_auto_aliases["[auto_alias_global_save ? "" : "[config.server_id]_"]auto_alt_key_name"]
		if (isnull(saved_auto_alt_key) || !isnum(saved_auto_alt_key))
			saved_auto_alt_key = 0
			saved_auto_alt_key_name = null
		if (!auto_stealth && saved_auto_alt_key == 1 && auto_alt_key != 1 && !isnull(saved_auto_alt_key_name))
			auto_alt_key = 1
			src.set_alt_key(saved_auto_alt_key_name, 1)
		auto_alt_key = saved_auto_alt_key
		auto_alt_key_name = saved_auto_alt_key_name

		var/saved_hear_prayers = AP["hear_prayers"]
		if (isnull(saved_hear_prayers))
			saved_hear_prayers = 0
		hear_prayers = saved_hear_prayers

		var/saved_audible_prayers = AP["audible_prayers"]
		if (isnull(saved_audible_prayers))
			saved_audible_prayers = 0
		audible_prayers = saved_audible_prayers

		var/saved_audible_ahelps = AP["audible_ahelps"]
		if (isnull(saved_audible_ahelps))
			saved_audible_ahelps = 0
		audible_ahelps = saved_audible_ahelps

		var/saved_atags = AP["atags"]
		if (isnull(saved_atags))
			saved_atags = 1
		see_atags = saved_atags

		var/saved_buildmode_view = AP["buildmode_view"]
		if (isnull(saved_buildmode_view))
			saved_buildmode_view = 0
		buildmode_view = saved_buildmode_view

		var/saved_spawn_in_loc = AP["spawn_in_loc"]
		if (isnull(saved_spawn_in_loc))
			saved_spawn_in_loc = 0
		spawn_in_loc = saved_spawn_in_loc

		var/saved_show_topic_log = AP["show_topic_log"]
		if (isnull(saved_show_topic_log))
			saved_show_topic_log = FALSE
		show_topic_log = saved_show_topic_log

		var/saved_skip_manifest = AP["skip_manifest"]
		if (isnull(saved_skip_manifest))
			saved_skip_manifest = FALSE
		skip_manifest = saved_skip_manifest

		var/saved_hide_offline_indicators = AP["hide_offline_indicators"]
		if (isnull(saved_hide_offline_indicators))
			saved_hide_offline_indicators = TRUE
		hide_offline_indicators = saved_hide_offline_indicators

		var/saved_slow_stat = AP["slow_stat"]
		if (isnull(saved_slow_stat))
			saved_slow_stat = FALSE
		slow_stat = saved_slow_stat

		src.hidden_categories = list()
		for(var/cat in toggleable_admin_verb_categories)
			var/cat_hidden = AP["hidden_[cat]"]
			if(isnull(cat_hidden))
				if(src.level >= LEVEL_CODER || cat == ADMIN_CAT_SELF || cat == ADMIN_CAT_SERVER || cat == ADMIN_CAT_PLAYERS)
					cat_hidden = 0
				else
					cat_hidden = 1
			if(cat_hidden)
				src.owner?.hide_verb_category(ADMIN_CAT_PREFIX + cat)
				src.hidden_categories |= cat
			else
				src.owner?.show_verb_category(ADMIN_CAT_PREFIX + cat)

		if (src.owner)
			boutput(src.owner, SPAN_NOTICE("Admin preferences loaded."))

	proc/save_admin_prefs()
		if (!src.owner)
			return
		var/data = owner.player?.cloudSaves.getData("admin_preferences")
		var/list/auto_aliases = list()
		if (data) // decoding null will runtime
			data = json_decode(data)
			auto_aliases = data["auto_aliases"]

		if (auto_alias_global_save)
			auto_aliases["auto_stealth"] = auto_stealth
			auto_aliases["auto_stealth_name"] = auto_stealth_name
			auto_aliases["auto_alt_key"] = auto_alt_key
			auto_aliases["auto_alt_key_name"] = auto_alt_key_name
		else // let's not wipe out their local saves in case they toggle global saving off
			auto_aliases["[config.server_id]_auto_stealth"] = auto_stealth
			auto_aliases["[config.server_id]_auto_stealth_name"] = auto_stealth_name
			auto_aliases["[config.server_id]_auto_alt_key"] = auto_alt_key
			auto_aliases["[config.server_id]_auto_alt_key_name"] = auto_alt_key_name

		var/list/AP = list()

		AP["auto_aliases"] = auto_aliases
		AP["auto_alias_global_save"] = auto_alias_global_save
		AP["popuptoggle"] = popuptoggle
		AP["servertoggles_toggle"] = servertoggles_toggle
		AP["animtoggle"] = disable_atom_verbs
		AP["attacktoggle"] = attacktoggle
		AP["rp_word_filtering"] = rp_word_filtering
		AP["uncool_word_filtering"] = uncool_word_filtering
		AP["ghost_respawns"] = ghost_respawns
		AP["adminwho_alerts"] = adminwho_alerts
		AP["hear_prayers"] = hear_prayers
		AP["audible_prayers"] = audible_prayers
		AP["atags"] = see_atags
		AP["audible_ahelps"] = audible_ahelps
		AP["buildmode_view"] = buildmode_view
		AP["spawn_in_loc"] = spawn_in_loc
		AP["show_topic_log"] = show_topic_log
		AP["skip_manifest"] = skip_manifest
		AP["hide_offline_indicators"] = hide_offline_indicators
		AP["slow_stat"] = slow_stat

		for(var/cat in toggleable_admin_verb_categories)
			AP["hidden_[cat]"] = (cat in src.hidden_categories)

		if (!owner.player?.cloudSaves.putData("admin_preferences", json_encode(AP)))
			tgui_alert(src.owner, "ERROR: Unable to reach cloud.")
		else
			boutput(src.owner, SPAN_NOTICE("Admin preferences saved."))

	proc/admin_message_to_me(source, message)
		src.owner?.message_one_admin(source, message)

/client/proc/change_admin_prefs()
	SET_ADMIN_CAT(ADMIN_CAT_SELF)
	set name = "Change Admin Preferences"
	ADMIN_ONLY
	SHOW_VERB_DESC

	src.holder.show_pref_window(src.mob)

/proc/admin_key(var/client/C, var/return_administrator = 0)
	if (!C)
		return "Administrator"
	if (C.stealth)
		if (return_administrator)
			return "Administrator"
		else
			return C.fakekey
	if (C.alt_key)
		return C.fakekey
	else
		return C.key

/client/proc/hide_verb_category(cat)
	if(!src.hidden_verbs)
		src.hidden_verbs = list()
	for(var/vrb in src.verbs)
		if(vrb:category == cat)
			src.verbs -= vrb
			src.hidden_verbs |= vrb

/client/proc/show_verb_category(cat)
	if(!src.hidden_verbs)
		return
	for(var/vrb in src.hidden_verbs)
		if(vrb:category == cat)
			src.hidden_verbs -= vrb
			src.verbs |= vrb


#undef ADMIN_SPEECH_OUTPUTS
#undef ADMIN_SPEECH_MODIFIERS
#undef ADMIN_SPEECH_PREFIXES
#undef ADMIN_LISTEN_INPUTS
#undef ADMIN_LISTEN_MODIFIERS
#undef ADMIN_LISTEN_EFFECTS
#undef ADMIN_LISTEN_CONTROLS
#undef ADMIN_UNDERSTOOD_LANGUAGES
