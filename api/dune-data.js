export default async function handler(req, res) {
    const options = {
        method: 'GET',
        headers: {
            'X-Dune-Api-Key': process.env.test_to_dune_echo
        }
    };

    try {
        const response = await fetch('https://api.dune.com/api/echo/v1/balances/evm/0xf924efc8830bfA1029fA0cd7a51901a5EC03DE3d?chain_ids=8453&filters=ERC20', options);
        const data = await response.json();
        
        // Log the raw response
        console.log('Raw API Response:', JSON.stringify(data, null, 2));
        
        // Check if data exists and has the expected structure
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data structure received from API');
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch data' });
    }
} 