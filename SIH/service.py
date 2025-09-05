import os
from fastapi import FastAPI
from pydantic import BaseModel
import paho.mqtt.client as mqtt
import threading

MQTT_HOST = os.getenv("MQTT_HOST", "broker.emqx.io")
MQTT_TOPIC = os.getenv("MQTT_TOPIC", "smart_tourism/sos")

app = FastAPI(title="IoT SOS Service", version="0.1.0")

class SOS(BaseModel):
    lat: float
    lon: float
    message: str | None = None

@app.on_event("startup")
def _mqtt_start():
    def run():
        client = mqtt.Client()
        client.connect(MQTT_HOST, 1883, 60)
        client.loop_forever()
    threading.Thread(target=run, daemon=True).start()

@app.post("/sos/publish")
def publish_sos(sos: SOS):
    client = mqtt.Client()
    client.connect(MQTT_HOST, 1883, 60)
    client.publish(MQTT_TOPIC, sos.model_dump_json())
    client.disconnect()
    return {"published": True}
