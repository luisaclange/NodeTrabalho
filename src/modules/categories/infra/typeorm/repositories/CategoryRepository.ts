import ICategoryDTO from "../../../dtos/ICategoryDTO";
import ICategoryRepository from "../../../repositories/ICategoryRepository";
import { getRepository, Repository } from "typeorm";
import Category from "../entities/Category";
import { response } from "express";

export default class CategoryRepository implements
ICategoryRepository {
private ormRepository: Repository<Category>;
    constructor() {
        this.ormRepository = getRepository(Category);
    }

    async create(data: ICategoryDTO): Promise<Category> {
        const category = await this.ormRepository.create(data);
        return this.ormRepository.save(category);
    }

    async find(): Promise<Category[]> {
        return this.ormRepository.find();
    }

    async findOne(id: number): Promise<Category|undefined> {
        return this.ormRepository.findOne(id);
    }

    async update(data: ICategoryDTO,id: number): Promise<Category> {
        await this.ormRepository.delete(id);
        data.id = id;
        const category = await this.ormRepository.create(data);
        return this.ormRepository.save(category);
    }

    async delete(id: number): Promise<Category[]> {
        await this.ormRepository.delete(id);
        return this.ormRepository.find();
    }
}
