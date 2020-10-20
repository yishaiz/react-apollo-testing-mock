import React from 'react';
import renderer from 'react-test-renderer';
import {createMockClient, MockedProvider} from '@apollo/client/testing'
import {GET_DOG_QUERY, Dog} from './Dog'
import {DeleteButton, DELETE_DOG_MUTATION} from './delete-dog';
// import DeleteButton, { DELETE_DOG_MUTATION } from './Dog';

import {act} from "@testing-library/react";

// import {render} from '@testing-library/react';

// const mocks = [
//     {
//         request: {
//             query: GET_DOG_QUERY,
//             variables: {
//                 name: 'Buck'
//             },
//         },
//         result: {
//             data: {
//                 dog: {id: '1', name: 'Buck', breed: 'bulldog'}
//             }
//         }
//     },
//     {
//         request: {
//             query: GET_DOG_QUERY,
//             variables: {
//                 name: 'Mooki'
//             },
//         },
//         result: () => {
//             return {
//                 data: {
//                     dog: {id: '2', name: 'Mooki', breed: 'amstaf'}
//                 }
//             }
//         }
//     }
// ];
//
// // test('renders learn react link', () => {
// //   expect (true).toBe(false)
// //   // const { getByText } = render(<App />);
// //   // const linkElement = getByText(/learn react/i);
// //   // expect(linkElement).toBeInTheDocument();
// // });
//
// // Broken because it's missing Apollo Client in the context
// // const result =
// // console.log({result})
//
// it('should render without error', () => {
//     renderer.create(
//         <MockedProvider mocks={mocks} addTypename={false}>
//             <Dog name="Buck"/>
//         </MockedProvider>
//     );
// });
//
// it('should render without error. using function', () => {
//     renderer.create(
//         <MockedProvider mocks={mocks} addTypename={false}>
//             <Dog name="Mooki"/>
//         </MockedProvider>
//     );
// });
//
// it('should render loading state initially', () => {
//     const component = renderer.create(
//         <MockedProvider mocks={[]}>
//             <Dog></Dog>
//         </MockedProvider>
//     )
//
//     const tree = component.toJSON()
//     expect(tree.children).toContain('Loading...')
//
//     console.log({tree})
//     // console.log({component, tree})
// });
//
// it('should render dog (after loading)', async () => {
//     const dogMock = {
//         request: {
//             query: GET_DOG_QUERY,
//             variables: {name: 'Buck'},
//         },
//         result: {
//             data: {dog: {id: 1, name: 'Buck', breed: 'poodle'}},
//         },
//     };
//
//     const component = renderer.create(
//         <MockedProvider mocks={[dogMock]} addTypename={false}>
//             <Dog name="Buck"/>
//         </MockedProvider>,
//     );
//     // const tree = component.toJSON()
//     // expect(tree.children).toContain('Loading...')
//
//     await act(async () => {
//         /* fire events that update state */
//
//         await new Promise(resolve => setTimeout(resolve, 100)); // wait for response
//         const p = component.root.findByType('p');
//
//         // expect(p.children).toContain('Buck is a poodle');
//
//         expect(p.children).toContain('Buck');
//         expect(p.children).toContain(' is a ');
//         expect(p.children).toContain('poodle');
//     });
//
//
// });
//
// it('should show error UI', async () => {
//     const dogMock = {
//         request: {
//             query: GET_DOG_QUERY,
//             variables: { name: 'Buck' },
//         },
//         error: new Error('aw shucks'),
//     };
//
//     const component = renderer.create(
//         <MockedProvider mocks={[dogMock]} addTypename={false}>
//             <Dog name="Buck" />
//         </MockedProvider>,
//     );
//
//     await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
//
//     const tree = component.toJSON();
//     expect(tree.children).toContain('Error!');
// });
//


// it('should show error - use GraphQL error', async () => {
//     const dogMock = {
//         request: {
//             query: GET_DOG_QUERY,
//             variables: {name: 'Buck'},
//         },
//         result: {
//             errors: [new Error('aw shucks')]
//         }
//     };
//
//     const component = renderer.create(
//         <MockedProvider mocks={[dogMock]} addTypename={false}>
//             <Dog name="Buck"/>
//         </MockedProvider>,
//     );
//
//     await new Promise(resolve => setTimeout(resolve, 0)); // wait for response
//
//     const tree = component.toJSON();
//     // expect(tree.children).toContain('Buck');
//     expect(tree.children).toContain('Error!');
// });


it('should render delete without error', () => {
    renderer.create(
        <MockedProvider mocks={[]}>
            <DeleteButton/>
        </MockedProvider>,
    );
});

it('should render loading state initially', () => {
    const deleteDog = { name: 'Buck', breed: 'Poodle', id: 1 };
    const mocks = [
        {
            request: {
                query: DELETE_DOG_MUTATION,
                variables: { name: 'Buck' },
            },
            result: { data: { deleteDog } },
        },
    ];

    const component = renderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <DeleteButton />
        </MockedProvider>,
    );

    // find the button and simulate a click
    const button = component.root.findByType('button');
    button.props.onClick(); // fires the mutation

    const tree = component.toJSON();
    expect(tree.children).toContain('Loading...');
});


it('should delete and give visual feedback', async () => {
    const deleteDog = { name: 'Buck', breed: 'Poodle', id: 1 };
    const mocks = [
        {
            request: {
                query: DELETE_DOG_MUTATION,
                variables: { name: 'Buck' },
            },
            result: { data: { deleteDog } },
        },
    ];

    const component = renderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <DeleteButton />
        </MockedProvider>,
    );

    // find the button and simulate a click
    const button = component.root.findByType('button');
    button.props.onClick(); // fires the mutation

    await new Promise(resolve => setTimeout(resolve, 0)); // wait for response

    const tree = component.toJSON();
    console.log('result :', tree.children)
    expect(tree.children).toContain('Deleted!');
});
