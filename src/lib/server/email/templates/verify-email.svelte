<script lang="ts">
  import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
  } from "@better-svelte-email/components";

  const { otp }: { otp: string } = $props();
</script>

<Html lang="en">
  <Head />
  <Body
    style="background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;margin:0;padding:32px 0;"
  >
    <Preview preview={`${otp} is your Snapgram verification code`} />

    <Container
      style="background-color:#ffffff;max-width:420px;margin:0 auto;padding:32px;border-radius:12px;"
    >
      <Section>
        <Heading
          as="h1"
          style="font-size:20px;font-weight:700;color:#18181b;margin:0 0 16px;text-align:center;"
        >
          Confirm your email
        </Heading>

        <Text
          style="font-size:14px;color:#52525b;line-height:1.5;margin:0 0 24px;text-align:center;"
        >
          Use the code below to confirm your email address and complete your
          Snapgram sign-up.
        </Text>

        <Text
          style="font-family:'Courier New',Courier,monospace;font-size:36px;font-weight:700;letter-spacing:8px;color:#18181b;background-color:#f4f4f5;border-radius:8px;padding:16px 0;margin:0 0 16px;text-align:center;"
        >
          {otp}
        </Text>

        <Text
          style="font-size:13px;color:#71717a;margin:0 0 24px;text-align:center;"
        >
          This code expires in 5 minutes.
        </Text>

        <Text
          style="font-size:13px;color:#71717a;line-height:1.5;margin:0;text-align:center;"
        >
          If you didn't create a Snapgram account, you can safely ignore this
          email.
        </Text>
      </Section>

      <Hr
        style="border:none;border-top:1px solid #e4e4e7;margin:32px 0 16px;"
      />

      <Text style="font-size:12px;color:#a1a1aa;margin:0;text-align:center;">
        Snapgram
      </Text>
    </Container>
  </Body>
</Html>
