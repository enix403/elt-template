import http from 'http';
import { CommResultType } from '@shared/communication';

const HOSTNAME = 'localhost';
const PORT = process.env.DEV_MOCK_SERVER_PORT;

export function httpPost({ body, ...options }) {
    return new Promise<any>((resolve, reject) => {
        const req = http.request({
            method: 'POST',
            ...options,
        }, res => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                resolve(JSON.parse(body))
            })
        })
        req.on('error', reject);
        if (body) {
            req.write(body);
        }
        req.end();
    })
}

export async function sendMessage(channel: string, message: any) {
    try {
        return await httpPost({
            hostname: HOSTNAME,
            port: PORT,
            path: `/`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                channel,
                message
            })
        });
    }
    catch (e) {
        console.error("CommunicationError:", "[NodeJS] Http request send/receive error");
        return { type: CommResultType.CommunicationError };
    }
}
