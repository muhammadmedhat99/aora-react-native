import { Account, Avatars, Client, Databases, ID, OAuthProvider, Query } from "react-native-appwrite";

import { openAuthSessionAsync } from "expo-web-browser";

import * as Linking from "expo-linking";

interface signInParams {
  email: string;
  password: string;
}
interface createUserParams {
  email: string;
  password: string;
  username: string;
}

export const config = {
  platform: "com.mumb.aora",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  usersCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
  videosCollectionId: process.env.EXPO_PUBLIC_APPWRITE_VIDEOS_COLLECTION_ID,
  storageId: process.env.EXPO_PUBLIC_APPWRITE_STORAGE_ID,
}

export const client = new Client();
export const avatars = new Avatars(client);
export const databases = new Databases(client);

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!)

const account = new Account(client);

export const createUser = async ({ email, password, username }: createUserParams) => {

  try {
    const newAccount = await account.create(ID.unique(), email, password, username)

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username)

    await signIn({ email: email, password: password })

    const newUser = await databases.createDocument(config.databaseId!, config.usersCollectionId!, ID.unique(), { accountId: newAccount.$id, email, username, avatar: avatarUrl })
    return newUser;
  } catch (error) {
    console.log("error ===>>", error)
    return false
  }
}

export const signIn = async ({ email, password }: signInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;

  } catch (error) {
    console.log("error ===>>", error)
    return false
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log("error ===>>", error)
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current")
    return true
  } catch (error) {
    console.log("error ===>>", error)
    return false
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await account.get();
    if (response.$id) {
      const userAvatar = avatars.getInitials(response.name)
      return { ...response, avatar: userAvatar.toString() };
    }
  } catch (error) {
    console.log("error ===>>", error)
    return null;
  }
}