import { IStateSchema } from 'shared/config/storeConfig/StateSchema';
import { getLoginIsLoading } from './getLoginIsLoading';

describe( 'getLoginIsLoading.test', () => {
    test( 'should work fine', () => {
        const state: DeepPartial<IStateSchema> = {
            loginForm: {
                isLoading: true,
            },
        };

        expect( getLoginIsLoading( state as IStateSchema ) ).toEqual( state?.loginForm?.isLoading );
    } );

    test( 'should work fine without state', () => {
        const state: DeepPartial<IStateSchema> = {};

        expect( getLoginIsLoading( state as IStateSchema ) ).toEqual( false );
    } );
} );
