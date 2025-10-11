import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let fetchQuestionAnswers: FetchQuestionAnswersUseCase;

describe("Fetch Question Answers", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    fetchQuestionAnswers = new FetchQuestionAnswersUseCase(
      inMemoryAnswersRepository
    );
  });

  it("should be able to fetch question answers", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1"),
      })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1"),
      })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1"),
      })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1"),
      })
    );

    const { answers } = await fetchQuestionAnswers.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(answers).toHaveLength(4);
  });

  it("should be able to fetch paginated question answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID("question-1"),
        })
      );
    }

    const { answers } = await fetchQuestionAnswers.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(answers).toHaveLength(2);
  });
});
