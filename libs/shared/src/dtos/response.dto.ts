export class Response<T> {

    constructor() {
        this.errors = [];
    }

    success: boolean;
    errors: string[];
    data: T;

    setFailWithErrors(errors: string[]) : Response<T> {
        this.success = false;
        this.errors = errors;

        return this;
    }

    setFailWithError(error: string) : Response<T> {
        this.success = false;
        this.errors.push(error);

        return this;
    }

    setSuccess(data: T) : Response<T>{
        this.success = true;
        this.data = data;

        return this;
    }
}