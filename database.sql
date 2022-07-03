CREATE TABLE "to-do-list" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"importance" SMALLINT NOT NULL,
  "isComplete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "to-do-list" 
	("task", "importance", "isComplete")
VALUES 
	('task1', '2', 'false'),
	('task2', '4', 'false'),
	('task3', '10', 'false'),
	('task4', '1', 'false'),
	('task5', '5', 'false'),
	('task6', '6', 'false'),
	('task7', '6', 'false'),
	('task8', '1', 'false');
	
	SELECT * FROM "to-do-list";