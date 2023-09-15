import {ServiceLocator} from "../service-locator";
import {PGConfig} from "../database/pg_config";
import {UserRepository} from "../../modules/users/repositories/user-repository";
import {UserRepositoryImp} from "../../modules/users/repositories/user-repository-imp";


const service = ServiceLocator.getInstance();
const database = new PGConfig()

service.register<UserRepository>("user-repository", new UserRepositoryImp(database));