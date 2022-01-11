import bcrypt from 'bcrypt'
import { UserService } from "../services/UserService"
import jwt from 'jsonwebtoken'
const userService = new UserService()
import IUser from '../interfaces/IUser'
import ILogin from '../interfaces/ILogin'



class UserController {
    createUser = async (userData: IUser) => {
        const password = userData.password
        userData.password = await this.generateHashPassword(password)
        return await userService.createUser(userData)
    }

    findUsers = async () => {
        return await userService.findUsers()
    }

    findUserById = async (userId: string) => {
        return await userService.findUserById(parseInt(userId))
    }

    updateUserById = async (userId: string, data: any) => {
        return await userService.updateUserById(parseInt(userId), data)
    }

    deleteUserById = async (userId: string) => {
        return await userService.deleteUserById(parseInt(userId))
    }

    login = async (user: ILogin) => {
        return this.createJWTToken(user)
    }

    createJWTToken = async (user: ILogin) => {
        const resultUser = await userService.findUserByEmail(user.email)
        const payload = {
            id: resultUser.id
        };
        return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '15m' });
    }

    generateHashPassword = async (password: string) => {
        return bcrypt.hash(password, 12)
    }

}

export { UserController }