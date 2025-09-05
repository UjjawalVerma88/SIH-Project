import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tourist App',
      theme: ThemeData(useMaterial3: true, colorSchemeSeed: Colors.teal),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String status = 'Tap SOS to ping backend';
  Future<void> sendSOS() async {
    final res = await http.post(
      Uri.parse('http://10.0.2.2:8000/alerts/sos'),
      headers: {'Content-Type': 'application/json'},
      body: '{"lat":28.6,"lon":77.2,"message":"Help!"}',
    );
    setState(() => status = 'Response: ${res.statusCode}');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Smart Tourism')),
      body: Center(child: Text(status)),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: sendSOS, label: const Text('SOS'), icon: const Icon(Icons.warning),
      ),
    );
  }
}
