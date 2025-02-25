export default async function handler(req, res) {
    const options = {
        method: 'GET',
        headers: {
            'X-Dune-Api-Key': process.env.test_to_dune_echo,
            'Accept': 'application/json'
        }
    };

    try {
        // Log request details
        console.log('Request options:', {
            method: options.method,
            headers: {
                ...options.headers,
                'X-Dune-Api-Key': 'HIDDEN'
            }
        });

        const baseUrl = 'https://api.dune.com/api/echo/v1/balances/evm';
        const address = '0xf924efc8830bfA1029fA0cd7a51901a5EC03DE3d';
        const params = new URLSearchParams({
            chain_ids: '8453',
            filters: 'erc20'
        });

        const url = `${baseUrl}/${address}?${params}`;
        console.log('Request URL:', url);

        const response = await fetch(url, options);
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response Data:', JSON.stringify(data, null, 2));

        // Check if data is an array
        if (Array.isArray(data)) {
            res.status(200).json(data);
        } else if (data.balances && Array.isArray(data.balances)) {
            // If data is wrapped in an object with a balances array
            res.status(200).json(data.balances);
        } else {
            // If it's a single object or different structure
            res.status(200).json([data]);
        }

    } catch (error) {
        console.error('Fetch Error:', error);
        res.status(500).json({ error: error.message });
    }
} 