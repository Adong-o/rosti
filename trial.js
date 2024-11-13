document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const initialView = document.getElementById('initialView');
    const resultsView = document.getElementById('resultsView');
    const roastBtn = document.getElementById('roastBtn');

    const showLoading = (message) => {
        loadingScreen.classList.add('active');
        loadingScreen.querySelector('.loader-text').textContent = message; // Update loading message
    };
    const hideLoading = () => loadingScreen.classList.remove('active');

    roastBtn.addEventListener('click', async () => {
        const userUrl = document.getElementById('urlInput').value;
        
        if (!userUrl) {
            alert('Please enter a valid URL');
            return;
        }

        try {
            showLoading("Getting ready for roast..."); // Update loading message

            // const url = 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions';
            const url = 'https://infinite-gpt.p.rapidapi.com/infinite-gpt'; // New API URL
            const options = {
                method: 'POST',
                headers: {
                    'x-rapidapi-key': '4359430725msh8d26b3e2762caeap17a7c0jsne4725fc6f216',
                    'x-rapidapi-host': 'infinite-gpt.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `Please analyze and roast the website ${userUrl} by critiquing its visual design, user experience, and content quality, pointing out any confusing or annoying elements, and offering a brutally honest yet constructive final verdict, all with a touch of humor.`,
                    sysMsg: 'You are a superstar roast master Chatbot.' // Retaining the system message
                })
            };

            // Attempt to fetch the roast data
            const response = await fetch(url, options);
            if (!response.ok) {
                if (response.status === 403) { // Assuming 403 indicates token limit reached
                    throw new Error("API token limit reached for the day. Please try again later.");
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            }

            // Parse the response
            const data = await response.text();
            let roastContent;
            try {
                const jsonResponse = JSON.parse(data);
                roastContent = jsonResponse.msg; // Use the correct field from the response
            } catch (e) {
                roastContent = data;
            }

            // Display the roast as a single flowing paragraph
            document.getElementById('roastResult').innerHTML = `
                <div class="roast-content" style="font-family: inherit;"> <!-- Use the same font as the website -->
                    <h3 style="font-weight: bold;">🔥 Your Brutal Roast 🔥</h3>
                    <p>${roastContent.replace(/\d+\.\s/g, '') || "No roast generated."}</p> <!-- Remove numbers -->
                </div>
            `;

            // Switch views
            initialView.style.display = 'none';
            resultsView.style.display = 'flex';

        } catch (error) {
            console.error('Error details:', error);
            hideLoading();
            alert(`Our roast generator hit a snag! Error: ${error.message}. Please try again later.`);
        } finally {
            hideLoading();
        }
    });

    // Return button functionality
    document.getElementById('returnBtn').addEventListener('click', async () => {
        showLoading("Going back to the main page..."); // Update loading message
        setTimeout(() => {
            resultsView.style.display = 'none';
            initialView.style.display = 'block';
            document.getElementById('urlInput').value = '';
            hideLoading();
        }, 1500);
    });

    // Home button functionality
    document.getElementById('homeBtn').addEventListener('click', () => {
        showLoading("Loading the main page..."); // Update loading message
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });

    // Free trial button functionality
    document.getElementById('freeTrialBtn').addEventListener('click', () => {
        showLoading("Loading the trial page..."); // Update loading message
        setTimeout(() => {
            window.location.href = 'trial.html'; // Navigate to trial.html
        }, 1000);
    });
});