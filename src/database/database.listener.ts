import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class DatabaseListener implements OnApplicationBootstrap {
    constructor(private dataSource: DataSource) {}

    async onApplicationBootstrap() {
        try{
            if(this.dataSource.isInitialized){
                console.log('Database connected successfully');
            }
        }catch(error){
            console.error('Database connection error:', error);
        }
    }
}