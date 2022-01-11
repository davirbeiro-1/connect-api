import prismaClient from "../prisma";
import axios from "axios"
import IUser from '../interfaces/IUser'
import IUserDataFromFaceApi from "../interfaces/IUserDataFromFaceApi";

class UserService {

    createUser = async (userData: IUser) => {
        const { name, email, password, access_token } = userData
        return await prismaClient.user.create({
            data: {
                name,
                email,
                password,
                access_token
            }
        })
    }

    findUserById = async (userId: number) => {
        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })
        return await this.getUserDataFromFacebookApi(user.access_token)
    }

    findUserByEmail = async (email: string) => {
        return await prismaClient.user.findUnique({
            where: {
                email: email
            }
        })
    }

    findUsers = async () => {
        return await prismaClient.user.findMany()
    }

    updateUserById = async (userId: number, data: any) => {
        return await prismaClient.user.update({
            where: {
                id: userId
            },
            data: data
        })
    }

    deleteUserById = async (userId: number) => {
        return await prismaClient.user.delete({
            where: {
                id: userId
            }
        })
    }

    getUserDataFromFacebookApi = async (accessToken: string) => { 
        const resultUserData =  (await axios.get<IUserDataFromFaceApi>(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`)).data
        return resultUserData
    }

}

export { UserService }