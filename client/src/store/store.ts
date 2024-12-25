import { type ConfigureStoreOptions, configureStore } from "@reduxjs/toolkit"
import auth from "./auth-slice"

const storeOpts:ConfigureStoreOptions = {
    reducer: {
        auth
    }
}

const store = configureStore(storeOpts)

export default store