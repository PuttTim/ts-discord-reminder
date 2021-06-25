import { allParameters } from "../all"

export default async (allParameters: allParameters) => {
	const {
		dip,
		cache,
		message,
		match,
		clear,
		sendMessage,
		CHECK_MARK,
		CROSS_MARK
	} = allParameters
	if (!match("^--modify-here(?:(?= *$)(?!\\w+))")) return
	dip("--modify-here")

	clear(5000)
	if (message.channel.id === cache.getNotifyChannelId()) {
		message.react(CROSS_MARK).then()
		sendMessage("This channel is already the notify channel!", 5000).then()
	} else if (message.channel.id === cache.getModifyChannelId()) {
		message.react(CROSS_MARK).then()
		sendMessage("This channel is already the modify channel!", 5000).then()
	} else {
		await cache.setModifyChannelId(message.channel.id)
		message.react(CHECK_MARK).then()
	}
}
