const form = document.querySelector('form');
const output = document.querySelector('#output');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = document.querySelector('#input-text').value.trim();
    if (text) {
        output.textContent = 'Processing...';
        fetch('/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                output.textContent = data.error;
            } else {
                let html = '';
                if (data.grammar) {
                    html += '<h3>Grammar Check</h3>';
                    html += `<p>${data.grammar}</p>`;
                }
                if (data.plagiarism) {
                    html += '<h3>Plagiarism Check</h3>';
                    html += `<p>Matched with ${data.plagiarism.percentage}% of documents on the internet:</p>`;
                    for (let i = 0; i < data.plagiarism.links.length; i++) {
                        html += `<p><a href="${data.plagiarism.links[i]}">${data.plagiarism.links[i]}</a></p>`;
                    }
                }
                if (data.text_completion) {
                    html += '<h3>Text Completion</h3>';
                    html += `<p>${data.text_completion}</p>`;
                }
                if (data.paraphrasing) {
                    html += '<h3>Paraphrasing</h3>';
                    for (let i = 0; i < data.paraphrasing.length; i++) {
                        html += `<p>${data.paraphrasing[i]}</p>`;
                    }
                }
                output.innerHTML = html;
            }
        })
        .catch(error => {
            output.textContent = 'An error occurred. Please try again.';
        });
    }
});
