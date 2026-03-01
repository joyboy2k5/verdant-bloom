
-- Create sensor_data table for ESP32 data
CREATE TABLE public.sensor_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  moisture NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sensor_data ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read sensor data (public IoT data)
CREATE POLICY "Anyone can read sensor data"
  ON public.sensor_data FOR SELECT
  USING (true);

-- Allow anyone to insert sensor data (ESP32 devices)
CREATE POLICY "Anyone can insert sensor data"
  ON public.sensor_data FOR INSERT
  WITH CHECK (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.sensor_data;
