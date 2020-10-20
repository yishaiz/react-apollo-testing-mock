import React from 'react';
import renderer from 'react-test-renderer';
import {createMockClient, MockedProvider} from '@apollo/client/testing'
import {GET_DOG_QUERY, Dog} from './Dog'

// import {render} from '@testing-library/react';

const mocks = [
    {
        request: {
            query: GET_DOG_QUERY,
            variables: {
                name: 'Buck'
            },
        },
        result: {
            data: {
                dog: {id: '1', name: 'Buck', breed: 'bulldog'}
            }
        }
    },
    {
        request: {
            query: GET_DOG_QUERY,
            variables: {
                name: 'Mooki'
            },
        },
        result: () => {
            return {
                data: {
                    dog: {id: '2', name: 'Mooki', breed: 'amstaf'}
                }
            }
        }
    }
];

// test('renders learn react link', () => {
//   expect (true).toBe(false)
//   // const { getByText } = render(<App />);
//   // const linkElement = getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
// });

// Broken because it's missing Apollo Client in the context
// const result =
// console.log({result})

it('should render without error', () => {
    renderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Dog name="Buck"/>
        </MockedProvider>
    );
});

it('should render without error. using function', () => {
    renderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Dog name="Mooki"/>
        </MockedProvider>
    );
});

it('should render loading state initially', () => {
    const component = renderer.create(
        <MockedProvider mocks={[]}>
            <Dog></Dog>
        </MockedProvider>
    )

    const tree = component.toJSON()
    expect(tree.children).toContain('Loading...')

    console.log({tree})
    // console.log({component, tree})
});

it('should render dog (after loading)', async () => {
    const dogMock = {
        request: {
            query: GET_DOG_QUERY,
            variables: { name: 'Buck' },
        },
        result: {
            data: { dog: { id: 1, name: 'Buck', breed: 'poodle' } },
        },
    };

    const component = renderer.create(
        <MockedProvider mocks={[dogMock]} addTypename={false}>
            <Dog name="Buck" />
        </MockedProvider>,
    );

    await new Promise(resolve => setTimeout(resolve, 100)); // wait for response

    const p = component.root.findByType('p');
    expect(p.children).toContain('Buck is a poodle');
});




