import {ServiceLocator} from "../service-locator";
import {PGConfig} from "../database/pg_config";


const service = ServiceLocator.getInstance();
const database = new PGConfig()

service.register<PGConfig>("database", database);