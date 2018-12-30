import reducer from './todo';

describe('Todo Reducer', () => {
	test('returns a state object', () => {
		const result = reducer(undefined, { type: 'ANYTHING' });
		expect(result).toBeDefined();
	});

	test('adds a todo', () => {
		const startState = {
			todos: [
				{ id: 1, name: 'create static ui', isComplete: true },
				{ id: 2, name: 'create initial state', isComplete: false },
				{ id: 3, name: 'use state to render ui', isComplete: false }
			],
			currentTodo: ''
		};
		const expectedState = {
			todos: [
				{ id: 1, name: 'create static ui', isComplete: true },
				{ id: 2, name: 'create initial state', isComplete: false },
				{ id: 3, name: 'use state to render ui', isComplete: false },
				{ id: 4, name: 'added todo', isComplete: false }
			],
			currentTodo: ''
		};
		const action = {
			type: 'TODO_ADD',
			payload: { id: 4, name: 'added todo', isComplete: false }
		};
		const result = reducer(startState, action);
		expect(result).toEqual(expectedState);
	});
});
