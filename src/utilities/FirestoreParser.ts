import GuildCache from "../models/GuildCache"
import Reminder, { iReminder } from "../models/Reminder"

export default class FirestoreParser {
	private cache: GuildCache
	private docs: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[]

	public constructor(
		cache: GuildCache,
		docs: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[]
	) {
		this.cache = cache
		this.docs = docs
	}

	public getReminders(): Reminder[] {
		return this.docs
			.filter(doc => doc.id !== "draft")
			.map(doc => new Reminder(doc.data() as iReminder))
	}

	public getDraft(): Reminder | undefined {
		const data = this.docs.find(doc => doc.id === "draft")
		if (data) {
			return new Reminder(data.data() as iReminder)
		}
	}

}