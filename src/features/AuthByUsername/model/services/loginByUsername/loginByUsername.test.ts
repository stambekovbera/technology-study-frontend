import axios from 'axios';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { Dispatch } from '@reduxjs/toolkit';
import { IStateSchema } from 'shared/config/storeConfig/StateSchema';
import { userActions } from 'entities/User';

jest.mock( 'axios' );

const mockedAxios = jest.mocked( axios, true );

describe( 'loginByUsername.test', () => {
    let dispatch: Dispatch;
    let getState: () => IStateSchema;

    beforeEach( () => {
        dispatch = jest.fn();
        getState = jest.fn();
    } );

    test( 'success login', async () => {
        const userValue = { username: '123', id: 1 };

        mockedAxios.post.mockReturnValue( Promise.resolve( { data: userValue } ) );
        const action = loginByUsername( { username: '123', password: '123' } );
        const result = await action( dispatch, getState, undefined );
        expect( dispatch ).toHaveBeenCalledWith( userActions.setAuthData( userValue ) );
        expect( dispatch ).toHaveBeenCalledTimes( 3 );
        expect( mockedAxios.post ).toHaveBeenCalled();
        expect( result.meta.requestStatus ).toBe( 'fulfilled' );
        expect( result.payload ).toEqual( userValue );
    } );

    test( 'error login', async () => {
        mockedAxios.post.mockReturnValue( Promise.resolve( { status: 403 } ) );
        const action = loginByUsername( { username: '123', password: '123' } );
        const result = await action( dispatch, getState, undefined );
        expect( dispatch ).toHaveBeenCalledTimes( 2 );
        expect( mockedAxios.post ).toHaveBeenCalled();
        expect( result.meta.requestStatus ).toBe( 'rejected' );
        expect( result.payload ).toBe( 'error' );
    } );
} );