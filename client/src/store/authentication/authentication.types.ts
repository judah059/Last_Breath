export interface AuthState {
    token: string | null
    refresh: string | null
    isLoading: boolean
}