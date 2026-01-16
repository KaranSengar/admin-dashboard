import type { Credentails } from "../types";
import {api} from './client'

//auth service

export const login=(credentials:Credentails)=>api.post('/auth/login',credentials);