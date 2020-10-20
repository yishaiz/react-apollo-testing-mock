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
    }
];

// test('renders learn react link', () => {
//   expect (true).toBe(false)
//   // const { getByText } = render(<App />);
//   // const linkElement = getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
// });

// Broken because it's missing Apollo Client in the context

it('should render without error', () => {
    renderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Dog name="Buck"/>
        </MockedProvider>
    );
});