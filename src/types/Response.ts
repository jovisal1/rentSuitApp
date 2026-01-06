import { User } from "@/types/User";

export interface AuthResponse {
    user: User;
    token: string;
    expiresAt: string;
}
