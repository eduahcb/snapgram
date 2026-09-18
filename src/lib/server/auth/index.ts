import { BETTER_AUTH_URL } from "$env/static/private";
import { db } from "$lib/server/db";
import { createEmailService } from "$lib/server/email/email-service";
import { createNodemailerSender } from "$lib/server/email/nodemailer-sender";

import { createAuth } from "./client";

const emailSender = createNodemailerSender();
const emailService = createEmailService(emailSender);

export const auth = createAuth(db, BETTER_AUTH_URL, emailService);
