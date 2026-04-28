use reqwest::Client;
use serde_json::{json, Value};
use crate::errors::{AppError, AppResult};
use crate::models::chat::GroqMessage;

pub async fn chat_completion(
    api_key: &str,
    model: &str,
    system_prompt: &str,
    messages: Vec<GroqMessage>,
    user_message: &str,
) -> AppResult<String> {
    let client = Client::new();
    let mut all_messages: Vec<Value> = vec![
        json!({ "role": "system", "content": system_prompt })
    ];
    for msg in &messages {
        all_messages.push(json!({ "role": msg.role, "content": msg.content }));
    }
    all_messages.push(json!({ "role": "user", "content": user_message }));

    let response = client
        .post("https://api.groq.com/openai/v1/chat/completions")
        .bearer_auth(api_key)
        .json(&json!({
            "model": model,
            "messages": all_messages,
            "max_tokens": 1024,
            "temperature": 0.7
        }))
        .send()
        .await
        .map_err(|e| AppError::Internal(anyhow::anyhow!("Groq request failed: {}", e)))?;

    if !response.status().is_success() {
        let err_text = response.text().await.unwrap_or_default();
        return Err(AppError::Internal(anyhow::anyhow!("Groq API error: {}", err_text)));
    }

    let body: Value = response
        .json()
        .await
        .map_err(|e| AppError::Internal(anyhow::anyhow!("Failed to parse Groq response: {}", e)))?;

    let content = body["choices"][0]["message"]["content"]
        .as_str()
        .unwrap_or("I'm sorry, I couldn't generate a response. Please try again.")
        .to_string();

    Ok(content)
}

pub fn default_system_prompt() -> String {
    r#"You are WillBry Assistant, the official AI farming advisor for WillBry Agro-Innovations Limited, based in Kabale Municipality, Uganda. Your role is to help farmers, clients, and partners with agricultural questions.

You specialize in: Irish potato farming (especially in the Kigezi highlands), maize, coffee, beans, and sorghum cultivation in Uganda. You also advise on livestock (piggery, poultry), post-harvest handling, value addition, market prices, and WillBry's services.

Always be friendly, practical, and specific to Uganda's context. Use metric units. If asked about WillBry's products or services, mention them naturally. If you don't know something specific, say so and suggest contacting WillBry directly at willbroad2016@gmail.com or +256 789 747881.

Keep responses concise (2-4 paragraphs max) unless asked for detail. Respond in English unless the user writes in another language."#.to_string()
}
