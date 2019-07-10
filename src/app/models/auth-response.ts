/**
 * Interface defines api respones for User
 */
export interface AuthResponse {
    user: {
        pk: number;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        age: number;
        token: string,
        //expires_in: number
    };
}
