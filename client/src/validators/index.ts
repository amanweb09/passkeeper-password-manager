import { UnsavedCredential } from "../types";

export const validateCredentials = (cred: UnsavedCredential) => {
    const { domain, username, password } = cred

    const result = {
        passed: false,
        message: ""
    }

    if (!domain || !username || !password) {
        result.message = "Please fill all the fields"
        return result
    }

    const regex = /^https:\/\/www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
    if(!regex.test(domain)) {
        result.message = "Please provide a valid URL"
        return result
    }

    result.passed = true
    return result;
}