import { TrainerService } from '../../services/trainer.service'
import { TrainerController } from './trainer.controller';
import { Test, TestingModule } from "@nestjs/testing";
import { prismaMock } from '../../tests/configs/presets'
import { PrismaService } from '../../services/prisma.service';
import { PokemonService } from '../../services/pokemon.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('TrainerController', () => {
    let trainerService: TrainerService;
    let trainerController: TrainerController;
    let app: INestApplication;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [TrainerController],
            providers: [TrainerService, { provide: (PrismaService), useValue: jest.fn() }, PokemonService],
        }).compile()

        trainerService = moduleRef.get<TrainerService>(TrainerService);
        trainerController = moduleRef.get<TrainerController>(TrainerController);
        app = moduleRef.createNestApplication()
        await app.init()
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const trainer = {
                id: "63b2dddf-c2d7-497a-8fd1-e236990b16d0",
                name: "test",
                email: "test@mail.com",
                password: "pass"
            }

            prismaMock.trainer.create.mockResolvedValue(trainer)
            jest.spyOn(trainerService, 'createTrainer').mockImplementation(async () => await prismaMock.trainer.create({ data: trainer }));

            return request(app.getHttpServer()).post('/trainers').send(trainer).expect(201)
        });

        it('should not create user without email', async () => {
            const trainer: any = {
                id: "63b2dddf-c2d7-497a-8fd1-e236990b16d0",
                name: "test",
                email: null,
                password: "pass"
            }

            prismaMock.trainer.create.mockResolvedValue(trainer)
            jest.spyOn(trainerService, 'createTrainer').mockImplementation(async () => await prismaMock.trainer.create({ data: trainer }));
            return request(app.getHttpServer()).post('/trainers').send(trainer).expect(404).expect({
                message: "Email inválido."
            })
        });
    });

    afterAll(async () => {
        await app.close();
    });

});