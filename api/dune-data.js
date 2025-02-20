export default async function handler(req, res) {
    const options = {
        method: 'GET',
        headers: {
            'X-Dune-Api-Key': process.env.DUNE_API_KEY
        }
    };

    try {
        const response = await fetch('https://api.dune.com/api/echo/v1/balances/evm/0xf924efc8830bfA1029fA0cd7a51901a5EC03DE3d?chain_ids=8453&filters=ERC20', options);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
} 