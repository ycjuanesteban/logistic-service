export class Reponse<T> {
    success: boolean;
    errors: string;
    data: T;
}