
import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Random',
    name: 'random',
    group: ['transform'],
    version: 1,
    description: 'Gera um número aleatório (local ou via Random.org)',
    defaults: { name: 'Random' },
    icon: 'file:icon.svg',
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Mínimo',
        name: 'min',
        type: 'number',
        default: 0,
      },
      {
        displayName: 'Máximo',
        name: 'max',
        type: 'number',
        default: 100,
      },
      {
        displayName: 'Fonte',
        name: 'source',
        type: 'options',
        options: [
          { name: 'Local (Math.random)', value: 'local' },
          { name: 'Random.org (True RNG)', value: 'randomorg' },
        ],
        default: 'local',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const min = this.getNodeParameter('min', i) as number;
      const max = this.getNodeParameter('max', i) as number;
      const source = this.getNodeParameter('source', i) as string;

      let randomNumber: number;

      if (source === 'randomorg') {
        const response = await this.helpers.httpRequest({
          method: 'POST',
          url: 'https://api.random.org/json-rpc/4/invoke',
          json: true,
          body: {
            jsonrpc: '2.0',
            method: 'generateIntegers',
            params: {
              apiKey: process.env.RANDOM_ORG_API_KEY,
              n: 1,
              min,
              max,
            },
            id: 1,
          },
        });

        randomNumber = response.result.random.data[0];
      } else {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      }

      returnData.push({ json: { random: randomNumber, source } });
    }

    return [returnData];
  }
}
