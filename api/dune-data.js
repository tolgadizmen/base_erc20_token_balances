export default async function handler(req, res) {
    const options = {
        method: 'GET',
        headers: {
            'X-Dune-Api-Key': process.env.test_to_dune_echo
        }
    };

    try {
        console.log('Attempting to fetch with API key:', process.env.test_to_dune_echo ? 'Key exists' : 'No key found');
        
        const response = await fetch('https://api.dune.com/api/echo/v1/balances/evm/0xf924efc8830bfA1029fA0cd7a51901a5EC03DE3d?chain_ids=8453&filters=ERC20', options);
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const textData = await response.text(); // Get raw response text
        console.log('Raw response:', textData);

        try {
            const data = JSON.parse(textData); // Try to parse as JSON
            res.status(200).json(data);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            res.status(500).json({ 
                error: 'Failed to parse API response',
                rawResponse: textData
            });
        }

    } catch (error) {
        console.error('Fetch Error:', error);
        res.status(500).json({ 
            error: error.message || 'Failed to fetch data',
            type: error.constructor.name
        });
    }
} 