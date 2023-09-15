export class ServiceLocator {
    private static instance: ServiceLocator;

    private services: Map<string, any> = new Map();

    private constructor() {
    }


    public static getInstance(): ServiceLocator {
        if (!ServiceLocator.instance) {
            ServiceLocator.instance = new ServiceLocator();
        }

        return ServiceLocator.instance;
    }


    register<T>(name: string, service: T) {
        this.services.set(name, service);
    }

    get<T>(name: string): T {
        const service = this.services.get(name);
        if (service == null) {
            throw new Error(`Service ${name} not founded`)
        }

        console.log('service')
        return service;
    }


}