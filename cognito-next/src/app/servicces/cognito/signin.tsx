import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";

const clientId = process.env.NEXT_PUBLIC_AWS_CLIENT_ID!;
const clientSecret = process.env.NEXT_PUBLIC_AWS_CLIENT_SECRET_KEY!;
const region = process.env.NEXT_PUBLIC_AWS_REGION!;

function calculateSecretHash(clientId: string, clientSecret: string, username: string): string {
  const msg = username + clientId;
  const hmac = crypto.createHmac("sha256", clientSecret);
  hmac.update(msg);
  return hmac.digest("base64");
}

export const signin = async (username: string, password: string) => {
  try {
    const secretHash = calculateSecretHash(clientId, clientSecret, username);
    const client = new CognitoIdentityProviderClient({ region });

    const initiateAuthCommand = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: clientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: secretHash,
      },
    });

    const authResponse = await client.send(initiateAuthCommand);
    console.log("User logged in successfully:", authResponse);
    return authResponse.AuthenticationResult;
  } catch (error: unknown) {
    console.error("Login failed:", (error as Error).message);
  }
};