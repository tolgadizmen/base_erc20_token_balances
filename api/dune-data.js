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
            filters: 'ERC20'
        });

        const url = `${baseUrl}/${address}?${params}`;
        console.log('Request URL:', url);

        const response = await fetch(url, options);
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const data = await response.json();
        res.status(200).json(data);

    } catch (error) {
        console.error('Fetch Error:', error);
        res.status(500).json({ 
            error: error.message,
            type: error.constructor.name
        });
    }
} 