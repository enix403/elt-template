import type { CommResultType } from './constants';

export type ChannelResponse<T = any> = {
    type: CommResultType,
    data?: T | undefined,
    error?: string
};

export type SerializedMessage<T> = { action: string; payload: T };

export abstract class Message<T = {}, K = {}> {
    // This field is here only to make typescript *remember* the given generic argument
    // so that it can be later used for typechecking of message response
    //
    // @ts-ignore
    protected readonly __ResultType?: K | null = null;

    // This must be unique for each class
    public static readonly ACTION_NAME: string;

    // The actual data to send
    public payload: T | null = null;

    public serialize(): SerializedMessage<T | null> {
        const actionName = (this.constructor as typeof Message).ACTION_NAME;
        return { action: actionName, payload: this.payload || null }
    }
};

export interface MessageFactory<T, K> {
    new(...args: any[]): Message<T, K>;
};
