(() => {
  'use strict';

  const TOPIC_TITLE = 'Hotel Reception Practice';
  const QUESTION_BANK_B64 = 'W3siaWQiOiAxLCAicXVlc3Rpb24iOiAiV2hhdCBpcyB0aGUgZmlyc3QgdGhpbmcgeW91IHNob3VsZCBkbyB3aGVuIGEgZ3Vlc3QgYXJyaXZlcyBhdCB0aGUgaG90ZWw/IiwgIm9wdGlvbnMiOiBbIkFzayBmb3IgZG9jdW1lbnRzLiIsICJHcmVldCB0aGUgZ3Vlc3QuIiwgIk9mZmVyIGFkZGl0aW9uYWwgc2VydmljZXMuIiwgIkdpdmUgdGhlIGtleS4iXSwgImFuc3dlckluZGV4IjogMX0sIHsiaWQiOiAyLCAicXVlc3Rpb24iOiAiSG93IGRvIHlvdSBwb2xpdGVseSBhc2sgZm9yIHRoZSBndWVzdOKAmXMgbmFtZT8iLCAib3B0aW9ucyI6IFsiXCJXaGF0IGlzIHlvdXIgbmFtZT9cIiIsICJcIldobyBhcmUgeW91P1wiIiwgIlwiTWF5IEkgaGF2ZSB5b3VyIG5hbWUsIHBsZWFzZT9cIiIsICJcIk5hbWU/XCIiXSwgImFuc3dlckluZGV4IjogMn0sIHsiaWQiOiAzLCAicXVlc3Rpb24iOiAiV2hhdCBzaG91bGQgeW91IGFzayB0byBjb25maXJtIHRoZSByZXNlcnZhdGlvbj8iLCAib3B0aW9ucyI6IFsiXCJEbyB5b3UgaGF2ZSBhIHJlc2VydmF0aW9uP1wiIiwgIlwiQXJlIHlvdSBoZXJlIGZvciBhIG1lZXRpbmc/XCIiLCAiXCJEbyB5b3Ugd2FudCBhIHJvb20/XCIiLCAiXCJJcyB0aGlzIHlvdXIgZmlyc3QgdmlzaXQ/XCIiXSwgImFuc3dlckluZGV4IjogMH0sIHsiaWQiOiA0LCAicXVlc3Rpb24iOiAiV2hpY2ggcXVlc3Rpb24gaXMgY29ycmVjdCB0byBmaW5kIG91dCB0aGUgZGF0ZXMgb2Ygc3RheT8iLCAib3B0aW9ucyI6IFsiXCJXaGVuIGRvIHlvdSB3YW50IHRvIGxlYXZlP1wiIiwgIlwiV2hhdCBhcmUgeW91ciBjaGVjay1pbiBhbmQgY2hlY2stb3V0IGRhdGVzP1wiIiwgIlwiSG93IG1hbnkgZGF5cyB3aWxsIHlvdSBzdGF5cz9cIiIsICJcIldoZW4gaXMgeW91ciBiaXJ0aGRheT9cIiJdLCAiYW5zd2VySW5kZXgiOiAxfSwgeyJpZCI6IDUsICJxdWVzdGlvbiI6ICJIb3cgZG8geW91IGFzayBhYm91dCB0aGUgbnVtYmVyIG9mIGd1ZXN0cz8iLCAib3B0aW9ucyI6IFsiXCJIb3cgbWFueSBwZW9wbGUgYXJlIHdpdGggeW91P1wiIiwgIlwiSG93IG1hbnkgZnJpZW5kcyBkbyB5b3UgaGF2ZT9cIiIsICJcIkFyZSB5b3UgYWxvbmU/XCIiLCAiXCJIb3cgbWFueSByb29tcyBkbyB5b3UgbmVlZD9cIiJdLCAiYW5zd2VySW5kZXgiOiAwfSwgeyJpZCI6IDYsICJxdWVzdGlvbiI6ICJXaGF0IGlzIHRoZSBjb3JyZWN0IHdheSB0byBhc2sgYWJvdXQgcm9vbSBwcmVmZXJlbmNlcz8iLCAib3B0aW9ucyI6IFsiXCJXaGF0IGtpbmQgb2Ygcm9vbSB3b3VsZCB5b3UgbGlrZT9cIiIsICJcIkRvIHlvdSB3YW50IGEgY2hlYXAgcm9vbT9cIiIsICJcIldoaWNoIHJvb20gaXMgZnJlZT9cIiIsICJcIkRvIHlvdSBsaWtlIG91ciByb29tcz9cIiJdLCAiYW5zd2VySW5kZXgiOiAwfSwgeyJpZCI6IDcsICJxdWVzdGlvbiI6ICJXaGF0IHNob3VsZCB5b3Ugc2F5IHdoZW4geW91IG5lZWQgdG8gdGFrZSB0aGUgZ3Vlc3TigJlzIGRvY3VtZW50cz8iLCAib3B0aW9ucyI6IFsiXCJDYW4gSSBzZWUgeW91ciBwYXNzcG9ydCwgcGxlYXNlP1wiIiwgIlwiR2l2ZSBtZSB5b3VyIHBhc3Nwb3J0LlwiIiwgIlwiUGFzc3BvcnQgbm93LlwiIiwgIlwiV2hlcmUgaXMgeW91ciBwYXNzcG9ydD9cIiJdLCAiYW5zd2VySW5kZXgiOiAwfSwgeyJpZCI6IDgsICJxdWVzdGlvbiI6ICJXaGF0IGRvIHlvdSBkbyBhZnRlciB0YWtpbmcgdGhlIGRvY3VtZW50cz8iLCAib3B0aW9ucyI6IFsiS2VlcCB0aGVtLiIsICJTY2FuIHRoZW0uIiwgIlRocm93IHRoZW0gYXdheS4iLCAiR2l2ZSB0aGVtIHRvIGFub3RoZXIgZ3Vlc3QuIl0sICJhbnN3ZXJJbmRleCI6IDF9LCB7ImlkIjogOSwgInF1ZXN0aW9uIjogIldoYXQgc2hvdWxkIHlvdSBkbyB3aXRoIHRoZSBkb2N1bWVudHMgYWZ0ZXIgc2Nhbm5pbmc/IiwgIm9wdGlvbnMiOiBbIktlZXAgdGhlbSBmb3IgeW91cnNlbGYuIiwgIlJldHVybiB0aGVtIHRvIHRoZSBndWVzdC4iLCAiU2VuZCB0aGVtIHRvIHRoZSBtYW5hZ2VyLiIsICJQdXQgdGhlbSBpbiB0aGUgc2FmZS4iXSwgImFuc3dlckluZGV4IjogMX0sIHsiaWQiOiAxMCwgInF1ZXN0aW9uIjogIldoYXQgZm9ybSBzaG91bGQgdGhlIGd1ZXN0IGZpbGwgb3V0IGF0IGNoZWNrLWluPyIsICJvcHRpb25zIjogWyJBIGNvbXBsYWludCBmb3JtLiIsICJBIGNvbnNlbnQgZm9ybSBmb3IgcGVyc29uYWwgZGF0YSBwcm9jZXNzaW5nLiIsICJBIGpvYiBhcHBsaWNhdGlvbi4iLCAiQSBzdXJ2ZXkuIl0sICJhbnN3ZXJJbmRleCI6IDF9LCB7ImlkIjogMTEsICJxdWVzdGlvbiI6ICJXaGF0IGVsc2Ugc2hvdWxkIHRoZSBndWVzdCBmaWxsIG91dD8iLCAib3B0aW9ucyI6IFsiQSBtYXAgb2YgdGhlIGNpdHkuIiwgIkEgZ3Vlc3QgY2FyZC4iLCAiQSByZXN0YXVyYW50IG1lbnUuIiwgIkEgZmVlZGJhY2sgZm9ybS4iXSwgImFuc3dlckluZGV4IjogMX0sIHsiaWQiOiAxMiwgInF1ZXN0aW9uIjogIldoYXQgZG8geW91IGdpdmUgdGhlIGd1ZXN0IGFmdGVyIGNoZWNrLWluIGlzIGNvbXBsZXRlPyIsICJvcHRpb25zIjogWyJBIGJyb2NodXJlLiIsICJUaGUgcm9vbSBrZXkuIiwgIkEgZGlzY291bnQgY291cG9uLiIsICJBIHRvd2VsLiJdLCAiYW5zd2VySW5kZXgiOiAxfSwgeyJpZCI6IDEzLCAicXVlc3Rpb24iOiAiSG93IGRvIHlvdSBvZmZlciBhZGRpdGlvbmFsIHNlcnZpY2VzPyIsICJvcHRpb25zIjogWyJcIldvdWxkIHlvdSBsaWtlIGFueSBleHRyYSBzZXJ2aWNlcz9cIiIsICJcIkRvIHlvdSBuZWVkIG1vbmV5P1wiIiwgIlwiQXJlIHlvdSBodW5ncnk/XCIiLCAiXCJEbyB5b3Ugd2FudCB0byBsZWF2ZT9cIiJdLCAiYW5zd2VySW5kZXgiOiAwfSwgeyJpZCI6IDE0LCAicXVlc3Rpb24iOiAiV2hhdCBzaG91bGQgeW91IHRlbGwgdGhlIGd1ZXN0IGFib3V0IHRoZSByZWNlcHRpb24gZGVzaz8iLCAib3B0aW9ucyI6IFsiSXQgaXMgb3BlbiBvbmx5IGluIHRoZSBtb3JuaW5nLiIsICJJdCB3b3JrcyAyNCBob3VycyBhIGRheS4iLCAiSXQgaXMgY2xvc2VkIG9uIHdlZWtlbmRzLiIsICJJdCBpcyBmb3Igc3RhZmYgb25seS4iXSwgImFuc3dlckluZGV4IjogMX0sIHsiaWQiOiAxNSwgInF1ZXN0aW9uIjogIkhvdyBkbyB5b3Ugb2ZmZXIgaGVscCB3aXRoIGx1Z2dhZ2U/IiwgIm9wdGlvbnMiOiBbIlwiRG8geW91IG5lZWQgaGVscCB3aXRoIHlvdXIgYmFncz9cIiIsICJcIldoZXJlIGFyZSB5b3VyIGJhZ3MgZnJvbT9cIiIsICJcIkRvIHlvdSBoYXZlIG1hbnkgYmFncz9cIiIsICJcIkNhbiBJIHNlbGwgeW91IGEgYmFnP1wiIl0sICJhbnN3ZXJJbmRleCI6IDB9LCB7ImlkIjogMTYsICJxdWVzdGlvbiI6ICJXaGF0IGlzIGEgcG9saXRlIHdheSB0byBhc2sgaWYgdGhlIGd1ZXN0IG5lZWRzIGFueXRoaW5nIGVsc2U/IiwgIm9wdGlvbnMiOiBbIlwiQW55dGhpbmcgZWxzZT9cIiIsICJcIkRvIHlvdSBuZWVkIGhlbHAgd2l0aCBhbnl0aGluZyBlbHNlP1wiIiwgIlwiQXJlIHlvdSBmaW5pc2hlZD9cIiIsICJcIkdvIGF3YXkgaWYgeW914oCZcmUgZG9uZS5cIiJdLCAiYW5zd2VySW5kZXgiOiAxfSwgeyJpZCI6IDE3LCAicXVlc3Rpb24iOiAiSG93IGRvIHlvdSBwb2xpdGVseSBlbmQgdGhlIGNoZWNrLWluIHByb2Nlc3M/IiwgIm9wdGlvbnMiOiBbIlwiR29vZGJ5ZSwgc2VlIHlvdSBsYXRlci5cIiIsICJcIlRoYW5rIHlvdSBmb3IgY2hvb3Npbmcgb3VyIGhvdGVsLCBoYXZlIGEgZ3JlYXQgc3RheSFcIiIsICJcIkxlYXZlIG5vdy5cIiIsICJcIkdvb2QgbHVjay5cIiJdLCAiYW5zd2VySW5kZXgiOiAxfSwgeyJpZCI6IDE4LCAicXVlc3Rpb24iOiAiV2hhdCBzaG91bGQgeW91IGRvIGlmIHRoZSBndWVzdCBkb2VzIG5vdCBoYXZlIGEgcmVzZXJ2YXRpb24/IiwgIm9wdGlvbnMiOiBbIlJlZnVzZSBzZXJ2aWNlLiIsICJIZWxwIHRoZW0gbWFrZSBhIHJlc2VydmF0aW9uLiIsICJJZ25vcmUgdGhlbS4iLCAiQXNrIHRoZW0gdG8gY29tZSBiYWNrIGxhdGVyLiJdLCAiYW5zd2VySW5kZXgiOiAxfSwgeyJpZCI6IDE5LCAicXVlc3Rpb24iOiAiV2hhdCBpcyBpbXBvcnRhbnQgdG8gY2hlY2sgYmVmb3JlIGdpdmluZyB0aGUga2V5PyIsICJvcHRpb25zIjogWyJUaGUgZ3Vlc3TigJlzIGZhdm9yaXRlIGNvbG9yLiIsICJUaGUgcm9vbSBjYXRlZ29yeSBhbmQgZGF0ZXMuIiwgIlRoZSB3ZWF0aGVyIGZvcmVjYXN0LiIsICJUaGUgdGltZSBvZiBkYXkuIl0sICJhbnN3ZXJJbmRleCI6IDF9LCB7ImlkIjogMjAsICJxdWVzdGlvbiI6ICJIb3cgZG8geW91IGFzayBmb3IgdGhlIGd1ZXN04oCZcyBwaG9uZSBudW1iZXI/IiwgIm9wdGlvbnMiOiBbIlwiV2hhdOKAmXMgeW91ciBudW1iZXI/XCIiLCAiXCJNYXkgSSBoYXZlIHlvdXIgY29udGFjdCBudW1iZXIsIHBsZWFzZT9cIiIsICJcIkNhbGwgbWUuXCIiLCAiXCJEbyB5b3UgaGF2ZSBhIHBob25lP1wiIl0sICJhbnN3ZXJJbmRleCI6IDF9LCB7ImlkIjogMjEsICJxdWVzdGlvbiI6ICJXaGF0IHNob3VsZCB5b3UgZG8gaWYgdGhlIGd1ZXN04oCZcyBkb2N1bWVudHMgYXJlIG5vdCB2YWxpZD8iLCAib3B0aW9ucyI6IFsiQWNjZXB0IHRoZW0gYW55d2F5LiIsICJQb2xpdGVseSBleHBsYWluIGFuZCBhc2sgZm9yIHZhbGlkIGRvY3VtZW50cy4iLCAiQ2FsbCB0aGUgcG9saWNlLiIsICJJZ25vcmUgaXQuIl0sICJhbnN3ZXJJbmRleCI6IDF9LCB7ImlkIjogMjIsICJxdWVzdGlvbiI6ICJIb3cgZG8geW91IGNvbmZpcm0gdGhlIHJvb20gcmF0ZT8iLCAib3B0aW9ucyI6IFsiRG9u4oCZdCBzYXkgYW55dGhpbmcuIiwgIlRlbGwgdGhlIGd1ZXN0IHRoZSB0b3RhbCBwcmljZSBmb3IgdGhlaXIgc3RheS4iLCAiQXNrIHRoZSBndWVzdCBob3cgbXVjaCB0aGV5IHdhbnQgdG8gcGF5LiIsICJHdWVzcyB0aGUgcHJpY2UuIl0sICJhbnN3ZXJJbmRleCI6IDF9LCB7ImlkIjogMjMsICJxdWVzdGlvbiI6ICJXaGF0IHNob3VsZCB5b3UgZG8gaWYgdGhlIGd1ZXN0IG5lZWRzIGEgbGF0ZSBjaGVjay1vdXQ/IiwgIm9wdGlvbnMiOiBbIlNheSBpdOKAmXMgaW1wb3NzaWJsZS4iLCAiQ2hlY2sgYXZhaWxhYmlsaXR5IGFuZCBpbmZvcm0gdGhlIGd1ZXN0LiIsICJJZ25vcmUgdGhlIHJlcXVlc3QuIiwgIkNoYXJnZSBleHRyYSB3aXRob3V0IGFza2luZy4iXSwgImFuc3dlckluZGV4IjogMX0sIHsiaWQiOiAyNCwgInF1ZXN0aW9uIjogIkhvdyBkbyB5b3UgYXNrIGlmIHRoZSBndWVzdCB3YW50cyBicmVha2Zhc3QgaW5jbHVkZWQ/IiwgIm9wdGlvbnMiOiBbIlwiRG8geW91IHdhbnQgdG8gZWF0P1wiIiwgIlwiV291bGQgeW91IGxpa2UgYnJlYWtmYXN0IGluY2x1ZGVkIGluIHlvdXIgc3RheT9cIiIsICJcIkFyZSB5b3UgaHVuZ3J5IG5vdz9cIiIsICJcIkJyZWFrZmFzdCBpcyBvbmx5IGZvciBjaGlsZHJlbi5cIiJdLCAiYW5zd2VySW5kZXgiOiAxfSwgeyJpZCI6IDI1LCAicXVlc3Rpb24iOiAiV2hhdCBzaG91bGQgeW91IGRvIGlmIHRoZSBndWVzdOKAmXMgY2FyZCBpcyBkZWNsaW5lZD8iLCAib3B0aW9ucyI6IFsiVGFrZSBjYXNoIG9ubHkuIiwgIlBvbGl0ZWx5IGFzayBmb3IgYW5vdGhlciBwYXltZW50IG1ldGhvZC4iLCAiUmVmdXNlIHNlcnZpY2UuIiwgIkFyZ3VlIHdpdGggdGhlIGd1ZXN0LiJdLCAiYW5zd2VySW5kZXgiOiAxfSwgeyJpZCI6IDI2LCAicXVlc3Rpb24iOiAiSG93IGRvIHlvdSBvZmZlciBhIHJvb20gdXBncmFkZT8iLCAib3B0aW9ucyI6IFsiRm9yY2UgdGhlIGd1ZXN0IHRvIHVwZ3JhZGUuIiwgIkFzayBpZiB0aGV5IHdvdWxkIGxpa2UgdG8gdXBncmFkZSBmb3IgYW4gZXh0cmEgZmVlLiIsICJVcGdyYWRlIHdpdGhvdXQgYXNraW5nLiIsICJEb27igJl0IG1lbnRpb24gdXBncmFkZXMuIl0sICJhbnN3ZXJJbmRleCI6IDF9LCB7ImlkIjogMjcsICJxdWVzdGlvbiI6ICJXaGF0IHNob3VsZCB5b3UgZG8gaWYgdGhlIGd1ZXN0IGxvc2VzIHRoZWlyIGtleT8iLCAib3B0aW9ucyI6IFsiSWdub3JlIGl0LiIsICJJc3N1ZSBhIG5ldyBrZXkgYW5kIGV4cGxhaW4gc2VjdXJpdHkgcnVsZXMuIiwgIkNoYXJnZSBhIGh1Z2UgZmluZS4iLCAiQXNrIHRoZW0gdG8gZmluZCBpdCB0aGVtc2VsdmVzLiJdLCAiYW5zd2VySW5kZXgiOiAxfSwgeyJpZCI6IDI4LCAicXVlc3Rpb24iOiAiSG93IGRvIHlvdSBleHBsYWluIHdoZXJlIGJyZWFrZmFzdCBpcyBzZXJ2ZWQ/IiwgIm9wdGlvbnMiOiBbIlBvaW50IHJhbmRvbWx5LiIsICJTYXk6IOKAnEJyZWFrZmFzdCBpcyBzZXJ2ZWQgaW4gb3VyIHJlc3RhdXJhbnQgZnJvbSA3IHRvIDEwIEFNLuKAnSIsICJEb27igJl0IHNheSBhbnl0aGluZy4iLCAiVGVsbCB0aGVtIHRvIGxvb2sgZm9yIHNpZ25zLiJdLCAiYW5zd2VySW5kZXgiOiAxfSwgeyJpZCI6IDI5LCAicXVlc3Rpb24iOiAiV2hhdCBzaG91bGQgeW91IGRvIGlmIHRoZSBndWVzdCBoYXMgYSBzcGVjaWFsIHJlcXVlc3QgKGUuZy4sIGV4dHJhIHBpbGxvdyk/IiwgIm9wdGlvbnMiOiBbIlNheSBpdOKAmXMgbm90IHBvc3NpYmxlLiIsICJOb3RlIGl0IGRvd24gYW5kIGluZm9ybSB0aGUgcmVsZXZhbnQgZGVwYXJ0bWVudC4iLCAiSWdub3JlIGl0LiIsICJDaGFyZ2UgZXh0cmEgd2l0aG91dCB0ZWxsaW5nIHRoZW0uIl0sICJhbnN3ZXJJbmRleCI6IDF9LCB7ImlkIjogMzAsICJxdWVzdGlvbiI6ICJIb3cgZG8geW91IGFzayBpZiB0aGUgZ3Vlc3QgbmVlZHMgYSB3YWtlLXVwIGNhbGw/IiwgIm9wdGlvbnMiOiBbIkRvbuKAmXQgYXNrLiIsICLigJxXb3VsZCB5b3UgbGlrZSBhIHdha2UtdXAgY2FsbD8gSWYgc28sIHdoYXQgdGltZT/igJ0iLCAi4oCcRG8geW91IHNsZWVwIHdlbGw/4oCdIiwgIuKAnFNldCB5b3VyIG93biBhbGFybS7igJ0iXSwgImFuc3dlckluZGV4IjogMX0sIHsiaWQiOiAzMSwgInF1ZXN0aW9uIjogIldoYXQgc2hvdWxkIHlvdSBkbyBhdCBjaGVjay1vdXQ/IiwgIm9wdGlvbnMiOiBbIkFzayBmb3IgcGF5bWVudCBhbmQgcmV0dXJuIGRvY3VtZW50cyBpZiBuZWVkZWQuIiwgIlNheSBub3RoaW5nLiIsICJBc2sgZm9yIHRpcHMuIiwgIlJ1c2ggdGhlIGd1ZXN0IG91dC4iXSwgImFuc3dlckluZGV4IjogMH0sIHsiaWQiOiAzMiwgInF1ZXN0aW9uIjogIkhvdyBkbyB5b3UgdGhhbmsgdGhlIGd1ZXN0IGF0IGNoZWNrLW91dD8iLCAib3B0aW9ucyI6IFsi4oCcR29vZGJ5ZS7igJ0iLCAi4oCcVGhhbmsgeW91IGZvciBzdGF5aW5nIHdpdGggdXMsIHdlIGhvcGUgdG8gc2VlIHlvdSBhZ2FpbiHigJ0iLCAi4oCcTGVhdmUgcXVpY2tseS7igJ0iLCAi4oCcRG9u4oCZdCBjb21lIGJhY2su4oCdIl0sICJhbnN3ZXJJbmRleCI6IDF9LCB7ImlkIjogMzMsICJxdWVzdGlvbiI6ICJXaGF0IHNob3VsZCB5b3UgZG8gaWYgdGhlIGd1ZXN0IGxlYXZlcyBzb21ldGhpbmcgaW4gdGhlIHJvb20/IiwgIm9wdGlvbnMiOiBbIktlZXAgaXQuIiwgIkluZm9ybSBsb3N0IGFuZCBmb3VuZCBhbmQgaGVscCByZXR1cm4gaXQuIiwgIlRocm93IGl0IGF3YXkuIiwgIlNlbGwgaXQuIl0sICJhbnN3ZXJJbmRleCI6IDF9LCB7ImlkIjogMzQsICJxdWVzdGlvbiI6ICJIb3cgZG8geW91IGFzayBmb3IgZmVlZGJhY2sgYXQgY2hlY2stb3V0PyIsICJvcHRpb25zIjogWyLigJxEaWQgeW91IGxpa2UgaXQ/4oCdIiwgIuKAnFdl4oCZZCBhcHByZWNpYXRlIHlvdXIgZmVlZGJhY2sgYWJvdXQgeW91ciBzdGF5LuKAnSIsICLigJxXcml0ZSBhIHJldmlldyBvciBlbHNlLuKAnSIsICLigJxEb27igJl0IHNheSBhbnl0aGluZy7igJ0iXSwgImFuc3dlckluZGV4IjogMX0sIHsiaWQiOiAzNSwgInF1ZXN0aW9uIjogIldoYXQgaXMgeW91ciBmaW5hbCByZXNwb25zaWJpbGl0eSBhcyBhIHJlY2VwdGlvbmlzdCBkdXJpbmcgY2hlY2staW4vY2hlY2stb3V0PyIsICJvcHRpb25zIjogWyJNYWtlIHN1cmUgYWxsIHByb2NlZHVyZXMgYXJlIGZvbGxvd2VkIGFuZCB0aGUgZ3Vlc3QgaXMgc2F0aXNmaWVkLiIsICJGaW5pc2ggYXMgcXVpY2tseSBhcyBwb3NzaWJsZS4iLCAiT25seSB0YWtlIG1vbmV5LiIsICJUYWxrIHRvIG90aGVyIHN0YWZmIG9ubHkuIl0sICJhbnN3ZXJJbmRleCI6IDB9XQ==';

  const GOOGLE_FORM = {
    actionUrl: '',
    fields: {
      name: '',
      group: '',
      topic: '',
      payload: '',
    },
  };

  const STORAGE_KEYS = {
    profile: 'hotel_practice_profile_v1',
    snapshot: 'hotel_practice_snapshot_v1',
    invalidate: 'hotel_practice_invalidate_v1',
    submitted: 'hotel_practice_submitted_v1',
    pending: 'hotel_practice_pending_v1',
  };

  const dom = {
    startScreen: document.getElementById('startScreen'),
    practiceScreen: document.getElementById('practiceScreen'),
    resultScreen: document.getElementById('resultScreen'),
    studentName: document.getElementById('studentName'),
    studentGroup: document.getElementById('studentGroup'),
    startBtn: document.getElementById('startBtn'),
    newSetBtn: document.getElementById('newSetBtn'),
    liveTopic: document.getElementById('liveTopic'),
    resultTopic: document.getElementById('resultTopic'),
    studentMeta: document.getElementById('studentMeta'),
    progressChip: document.getElementById('progressChip'),
    statusChip: document.getElementById('statusChip'),
    questionCanvas: document.getElementById('questionCanvas'),
    questionHotspots: document.getElementById('questionHotspots'),
    optionsList: document.getElementById('optionsList'),
    resultScore: document.getElementById('resultScore'),
    resultPercent: document.getElementById('resultPercent'),
    resultName: document.getElementById('resultName'),
    resultGroup: document.getElementById('resultGroup'),
    resultTime: document.getElementById('resultTime'),
    resultSession: document.getElementById('resultSession'),
    resultBadge: document.getElementById('resultBadge'),
    submissionState: document.getElementById('submissionState'),
    toast: document.getElementById('toast'),
    dictPopover: document.getElementById('dictPopover'),
    dictEmoji: document.getElementById('dictEmoji'),
    dictWord: document.getElementById('dictWord'),
    dictTranslation: document.getElementById('dictTranslation'),
    dictClose: document.getElementById('dictClose'),
  };

  const uiColors = {
    ink: '#eef5ff',
    muted: '#b5c3dd',
    accent: '#8fd9ff',
    dict: '#84f4cf',
    success: '#7ff1b5',
    danger: '#ff8f8f',
  };

  const BANK = decodeBank();
  const dictionary = new Map();
  let dictLoadTried = false;
  let dictHideTimer = 0;
  let advanceTimer = 0;

  const state = {
    sessionId: '',
    name: '',
    group: '',
    topic: TOPIC_TITLE,
    questions: [],
    currentIndex: 0,
    answers: [],
    startedAt: 0,
    currentStartedAt: 0,
    finishedAt: 0,
    finished: false,
    submitted: false,
    submitState: 'Waiting',
  };

  document.documentElement.setAttribute('translate', 'no');
  document.body.setAttribute('translate', 'no');
  document.body.classList.add('notranslate');

  attachProtection();
  preloadProfile();
  loadDictionary().finally(() => {
    hydrateFromSnapshot();
    render();
    tryPendingSubmission();
  });

  dom.startBtn.addEventListener('click', startSessionFromInputs);
  dom.newSetBtn.addEventListener('click', () => {
    resetInvalidation();
    startNewSet(true);
  });
  dom.dictClose.addEventListener('click', hideDictionary);
  window.addEventListener('resize', throttle(renderPractice, 60));
  document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });
  window.addEventListener('pagehide', handlePageHide, { passive: true });
  window.addEventListener('beforeunload', handleBeforeUnload, { passive: true });
  window.addEventListener('online', tryPendingSubmission);

  function decodeBank() {
    try {
      return JSON.parse(atob(QUESTION_BANK_B64));
    } catch (error) {
      console.error('Question bank decode failed', error);
      return [];
    }
  }

  async function loadDictionary() {
    if (dictLoadTried) return;
    dictLoadTried = true;
    try {
      const res = await fetch('./words.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('words.json not found');
      const data = await res.json();
      for (const row of data) {
        if (!row || !row.Word || !row.Translation) continue;
        const key = normalizeWord(row.Word);
        if (!key) continue;
        dictionary.set(key, {
          word: String(row.Word),
          translation: String(row.Translation),
          emoji: String(row.Emoji || '📘'),
        });
      }
    } catch (error) {
      console.warn('Dictionary disabled:', error);
    }
  }

  function attachProtection() {
    const swallow = (event) => event.preventDefault();
    ['copy', 'cut', 'contextmenu', 'dragstart', 'selectstart'].forEach((type) => {
      document.addEventListener(type, swallow);
    });

    document.addEventListener('keydown', (event) => {
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && ['a', 'c', 'p', 's', 'u', 'x'].includes(key)) {
        event.preventDefault();
      }
      if (key === 'f12') {
        event.preventDefault();
      }
    });
  }

  function preloadProfile() {
    const profile = safeRead(STORAGE_KEYS.profile, null);
    if (!profile) return;
    dom.studentName.value = profile.name || '';
    dom.studentGroup.value = profile.group || '';
  }

  function startSessionFromInputs() {
    const name = cleanInput(dom.studentName.value, 80);
    const group = cleanInput(dom.studentGroup.value, 50);

    if (!name || !group) {
      showToast('Enter name and group.');
      return;
    }

    safeWrite(STORAGE_KEYS.profile, { name, group });
    startNewSet(false);
  }

  function startNewSet(forceWithSavedProfile) {
    const profile = safeRead(STORAGE_KEYS.profile, {});

    state.name = cleanInput(forceWithSavedProfile ? (profile.name || dom.studentName.value) : dom.studentName.value, 80);
    state.group = cleanInput(forceWithSavedProfile ? (profile.group || dom.studentGroup.value) : dom.studentGroup.value, 50);
    state.topic = TOPIC_TITLE;
    state.sessionId = createSessionId();
    state.questions = buildSessionQuestions(BANK);
    state.currentIndex = 0;
    state.answers = [];
    state.startedAt = Date.now();
    state.currentStartedAt = Date.now();
    state.finishedAt = 0;
    state.finished = false;
    state.submitted = false;
    state.submitState = formReady() ? 'Sending…' : 'Not configured';

    safeWrite(STORAGE_KEYS.profile, { name: state.name, group: state.group });
    clearSnapshot();
    persistSnapshot();
    render();
  }

  function buildSessionQuestions(bank) {
    const pool = shuffle(bank.map((item) => ({
      id: item.id,
      question: item.question,
      options: item.options.map((text, index) => ({
        id: index,
        text,
        correct: index === item.answerIndex,
      })),
    })));

    return pool.map((item) => {
      const shuffledOptions = shuffle(item.options.map((option) => ({ ...option })));
      return {
        id: item.id,
        question: item.question,
        options: shuffledOptions,
      };
    });
  }

  function rerollCurrentTask() {
    if (!state.sessionId || state.finished || !state.questions.length) return;

    const start = Math.max(0, state.currentIndex);
    const remaining = state.questions.slice(start).map((item) => ({
      ...item,
      options: item.options.map((option) => ({ ...option })),
    }));

    if (!remaining.length) return;
    if (remaining.length === 1) {
      state.currentStartedAt = Date.now();
      persistSnapshot();
      renderPractice();
      return;
    }

    const currentId = remaining[0].id;
    let shuffledRemaining = shuffle(remaining);

    if (shuffledRemaining[0].id === currentId) {
      const swapIndex = shuffledRemaining.findIndex((item) => item.id !== currentId);
      if (swapIndex > 0) {
        [shuffledRemaining[0], shuffledRemaining[swapIndex]] = [shuffledRemaining[swapIndex], shuffledRemaining[0]];
      }
    }

    state.questions.splice(start, shuffledRemaining.length, ...shuffledRemaining);
    state.currentStartedAt = Date.now();
    persistSnapshot();
    renderPractice();
  }

  function hydrateFromSnapshot() {
    const navigationType = getNavigationType();
    const invalidation = safeRead(STORAGE_KEYS.invalidate, null);
    const profile = safeRead(STORAGE_KEYS.profile, null);
    const snapshot = safeRead(STORAGE_KEYS.snapshot, null);

    if (profile) {
      dom.studentName.value = profile.name || '';
      dom.studentGroup.value = profile.group || '';
    }

    if (snapshot) {
      Object.assign(state, snapshot);
      if ((navigationType === 'reload' || invalidation) && !state.finished) {
        rerollCurrentTask();
        resetInvalidation();
      }
      return;
    }

    if (invalidation) {
      resetInvalidation();
    }
  }

  function render() {
    dom.liveTopic.textContent = state.topic;
    dom.resultTopic.textContent = state.topic;

    const active = !!state.sessionId && !state.finished;
    const finished = !!state.sessionId && state.finished;

    dom.startScreen.classList.toggle('hidden', active || finished);
    dom.practiceScreen.classList.toggle('hidden', !active);
    dom.resultScreen.classList.toggle('hidden', !finished);

    if (active) {
      renderPractice();
    } else if (finished) {
      renderResult();
    }
  }

  function renderPractice() {
    if (!state.questions.length || state.finished) return;
    const item = state.questions[state.currentIndex];
    if (!item) return;

    dom.studentMeta.textContent = `${state.name} · ${state.group}`;
    dom.progressChip.textContent = `${state.currentIndex + 1} / ${state.questions.length}`;
    dom.statusChip.textContent = `Task ${state.currentIndex + 1}`;

    renderTextCanvas(dom.questionCanvas, dom.questionHotspots, item.question, {
      fontSize: clamp(window.innerWidth < 760 ? 22 : 28, 20, 30),
      lineHeight: 1.45,
      paddingX: window.innerWidth < 760 ? 18 : 24,
      paddingY: window.innerWidth < 760 ? 18 : 22,
      baseColor: uiColors.ink,
      wordColor: uiColors.dict,
      minHeight: 132,
      bold: true,
    });

    dom.optionsList.innerHTML = '';
    const currentAnswer = state.answers[state.currentIndex];
    const answered = !!currentAnswer;

    item.options.forEach((option, optionIndex) => {
      const card = document.createElement('div');
      card.className = 'option-card';
      if (answered) card.classList.add('locked');
      if (answered && currentAnswer.selectedOptionIndex === optionIndex) card.classList.add('selected');
      if (answered && option.correct) card.classList.add('correct');
      if (answered && currentAnswer.selectedOptionIndex === optionIndex && !currentAnswer.ok) card.classList.add('wrong');

      const inner = document.createElement('div');
      inner.className = 'option-inner';

      const letter = document.createElement('div');
      letter.className = 'option-letter';
      letter.textContent = String.fromCharCode(65 + optionIndex);

      const wrap = document.createElement('div');
      wrap.className = 'option-canvas-wrap';

      const canvas = document.createElement('canvas');
      const hotspotLayer = document.createElement('div');
      hotspotLayer.className = 'hotspot-layer';

      wrap.appendChild(canvas);
      wrap.appendChild(hotspotLayer);
      inner.appendChild(letter);
      inner.appendChild(wrap);
      card.appendChild(inner);

      card.addEventListener('click', () => answerCurrent(optionIndex), { passive: false });

      dom.optionsList.appendChild(card);

      renderTextCanvas(canvas, hotspotLayer, option.text, {
        fontSize: clamp(window.innerWidth < 760 ? 17 : 19, 16, 20),
        lineHeight: 1.4,
        paddingX: 16,
        paddingY: 14,
        baseColor: uiColors.ink,
        wordColor: uiColors.dict,
        minHeight: 76,
      });
    });
  }

  function answerCurrent(selectedOptionIndex) {
    const item = state.questions[state.currentIndex];
    if (!item || state.answers[state.currentIndex]) return;

    const selected = item.options[selectedOptionIndex];
    const elapsedMs = Date.now() - state.currentStartedAt;
    state.answers[state.currentIndex] = {
      qid: item.id,
      selectedOptionIndex,
      ok: !!selected.correct,
      elapsedMs,
    };
    persistSnapshot();
    renderPractice();

    clearTimeout(advanceTimer);
    advanceTimer = window.setTimeout(() => {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex += 1;
        state.currentStartedAt = Date.now();
        persistSnapshot();
        renderPractice();
      } else {
        finishSession();
      }
    }, 650);
  }

  function finishSession() {
    state.finished = true;
    state.finishedAt = Date.now();
    state.submitState = formReady() ? 'Sending…' : 'Not configured';
    persistSnapshot();
    render();
    submitOnce(buildPayload());
  }

  function renderResult() {
    const total = state.questions.length;
    const correct = state.answers.filter(Boolean).filter((row) => row.ok).length;
    const percent = total ? Math.round((correct / total) * 100) : 0;
    const durationSec = Math.max(1, Math.round(((state.finishedAt || Date.now()) - state.startedAt) / 1000));

    dom.resultScore.textContent = `${correct} / ${total}`;
    dom.resultPercent.textContent = `${percent}%`;
    dom.resultName.textContent = state.name || '—';
    dom.resultGroup.textContent = state.group || '—';
    dom.resultTime.textContent = formatDuration(durationSec);
    dom.resultSession.textContent = state.sessionId || '—';
    dom.resultBadge.textContent = percent >= 85 ? 'Excellent' : percent >= 65 ? 'Good' : 'Completed';
    dom.submissionState.textContent = state.submitState;
  }

  function buildPayload() {
    const total = state.questions.length;
    const correct = state.answers.filter(Boolean).filter((row) => row.ok).length;
    const durationSec = Math.max(1, Math.round(((state.finishedAt || Date.now()) - state.startedAt) / 1000));

    return {
      sessionId: state.sessionId,
      name: state.name,
      group: state.group,
      topic: state.topic,
      score: {
        correct,
        total,
        percent: total ? Math.round((correct / total) * 100) : 0,
      },
      durationSec,
      finishedAt: new Date(state.finishedAt || Date.now()).toISOString(),
      items: state.answers.map((row, index) => ({
        n: index + 1,
        ok: !!row.ok,
        t: Math.round((row.elapsedMs || 0) / 100) / 10,
      })),
    };
  }

  async function submitOnce(payload) {
    if (!formReady()) {
      state.submitState = 'Not configured';
      persistSnapshot();
      renderResult();
      return;
    }

    const submittedMap = safeRead(STORAGE_KEYS.submitted, {});
    if (submittedMap[state.sessionId]) {
      state.submitted = true;
      state.submitState = 'Already sent';
      persistSnapshot();
      renderResult();
      return;
    }

    const body = new URLSearchParams();
    body.set(GOOGLE_FORM.fields.name, payload.name);
    body.set(GOOGLE_FORM.fields.group, payload.group);
    body.set(GOOGLE_FORM.fields.topic, payload.topic);
    body.set(GOOGLE_FORM.fields.payload, JSON.stringify(payload));

    try {
      let sent = false;

      if (navigator.sendBeacon) {
        const blob = new Blob([body.toString()], {
          type: 'application/x-www-form-urlencoded;charset=UTF-8',
        });
        sent = navigator.sendBeacon(GOOGLE_FORM.actionUrl, blob);
      }

      if (!sent) {
        await fetch(GOOGLE_FORM.actionUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: body.toString(),
          keepalive: true,
        });
      }

      submittedMap[state.sessionId] = true;
      safeWrite(STORAGE_KEYS.submitted, submittedMap);
      safeWrite(STORAGE_KEYS.pending, null);
      state.submitted = true;
      state.submitState = 'Sent';
      persistSnapshot();
      renderResult();
    } catch (error) {
      console.warn('Submit failed, queued once:', error);
      safeWrite(STORAGE_KEYS.pending, {
        sessionId: state.sessionId,
        body: body.toString(),
        at: Date.now(),
      });
      state.submitState = 'Queued';
      persistSnapshot();
      renderResult();
    }
  }

  async function tryPendingSubmission() {
    if (!formReady() || !navigator.onLine) return;
    const pending = safeRead(STORAGE_KEYS.pending, null);
    if (!pending || !pending.body || !pending.sessionId) return;

    const submittedMap = safeRead(STORAGE_KEYS.submitted, {});
    if (submittedMap[pending.sessionId]) {
      safeWrite(STORAGE_KEYS.pending, null);
      return;
    }

    try {
      await fetch(GOOGLE_FORM.actionUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: pending.body,
        keepalive: true,
      });
      submittedMap[pending.sessionId] = true;
      safeWrite(STORAGE_KEYS.submitted, submittedMap);
      safeWrite(STORAGE_KEYS.pending, null);
      if (pending.sessionId === state.sessionId) {
        state.submitted = true;
        state.submitState = 'Sent';
        persistSnapshot();
        renderResult();
      }
    } catch (error) {
      console.warn('Pending submit failed again:', error);
    }
  }

  function formReady() {
    return Boolean(
      GOOGLE_FORM.actionUrl &&
      GOOGLE_FORM.fields.name &&
      GOOGLE_FORM.fields.group &&
      GOOGLE_FORM.fields.topic &&
      GOOGLE_FORM.fields.payload
    );
  }

  function renderTextCanvas(canvas, hotspotLayer, text, cfg) {
    const frame = canvas.parentElement;
    const width = Math.max(240, Math.floor(frame.clientWidth || frame.getBoundingClientRect().width || 240));
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const fontSize = cfg.fontSize || 20;
    const lineHeightPx = Math.round(fontSize * (cfg.lineHeight || 1.4));
    const paddingX = cfg.paddingX || 16;
    const paddingY = cfg.paddingY || 16;
    const fontWeight = cfg.bold ? 800 : 600;
    const font = `${fontWeight} ${fontSize}px Inter, Arial, sans-serif`;

    const probe = document.createElement('canvas').getContext('2d');
    probe.font = font;

    const tokens = tokenizeForCanvas(text);
    const lines = [];
    let currentLine = [];
    let currentWidth = 0;
    const maxWidth = width - paddingX * 2;

    for (const token of tokens) {
      const tokenWidth = probe.measureText(token.raw).width;
      if (token.kind === 'newline') {
        lines.push(currentLine);
        currentLine = [];
        currentWidth = 0;
        continue;
      }

      if (token.kind === 'space') {
        if (!currentLine.length) continue;
        currentLine.push({ ...token, width: tokenWidth });
        currentWidth += tokenWidth;
        continue;
      }

      if (currentWidth + tokenWidth > maxWidth && currentLine.length) {
        lines.push(trimLineEnd(currentLine));
        currentLine = [];
        currentWidth = 0;
      }

      currentLine.push({ ...token, width: tokenWidth });
      currentWidth += tokenWidth;
    }

    if (currentLine.length) lines.push(trimLineEnd(currentLine));
    if (!lines.length) lines.push([]);

    const height = Math.max(cfg.minHeight || 70, paddingY * 2 + lines.length * lineHeightPx);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.font = font;
    ctx.textBaseline = 'top';

    const wordBoxes = [];
    lines.forEach((line, lineIndex) => {
      let x = paddingX;
      const y = paddingY + lineIndex * lineHeightPx;
      line.forEach((token) => {
        if (token.kind === 'space') {
          x += token.width;
          return;
        }

        const normalized = normalizeWord(token.raw);
        const dictHit = dictionary.get(normalized);
        ctx.fillStyle = dictHit ? cfg.wordColor : cfg.baseColor;
        ctx.fillText(token.raw, x, y);

        if (dictHit) {
          const textWidth = token.width;
          ctx.fillStyle = 'rgba(132, 244, 207, 0.88)';
          ctx.fillRect(x, y + fontSize + 3, Math.max(6, textWidth), 2);

          wordBoxes.push({
            x: Math.max(0, x - 2),
            y: Math.max(0, y - 2),
            w: textWidth + 4,
            h: lineHeightPx,
            dict: dictHit,
          });
          ctx.fillStyle = cfg.wordColor;
        }

        x += token.width;
      });
    });

    renderHotspots(hotspotLayer, wordBoxes, width, height);
  }

  function renderHotspots(layer, wordBoxes, width, height) {
    layer.style.width = `${width}px`;
    layer.style.height = `${height}px`;
    layer.innerHTML = '';

    for (const box of wordBoxes) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'word-hotspot';
      btn.style.left = `${box.x}px`;
      btn.style.top = `${box.y}px`;
      btn.style.width = `${box.w}px`;
      btn.style.height = `${box.h}px`;
      btn.setAttribute('aria-label', box.dict.word);
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        showDictionary(box.dict);
      });
      layer.appendChild(btn);
    }
  }

  function showDictionary(dictItem) {
    clearTimeout(dictHideTimer);
    dom.dictEmoji.textContent = dictItem.emoji || '📘';
    dom.dictWord.textContent = dictItem.word;
    dom.dictTranslation.textContent = dictItem.translation;
    dom.dictPopover.classList.remove('hidden');
    dictHideTimer = window.setTimeout(hideDictionary, 3200);
  }

  function hideDictionary() {
    clearTimeout(dictHideTimer);
    dom.dictPopover.classList.add('hidden');
  }

  function handleVisibilityChange() {
    if (document.visibilityState === 'hidden' && state.sessionId && !state.finished) {
      safeWrite(STORAGE_KEYS.invalidate, {
        reason: 'hidden',
        at: Date.now(),
        sessionId: state.sessionId,
      });
    }

    if (document.visibilityState === 'visible') {
      const invalidation = safeRead(STORAGE_KEYS.invalidate, null);
      if (invalidation && state.sessionId && !state.finished) {
        resetInvalidation();
        rerollCurrentTask();
      }
    }
  }

  function handlePageHide() {
    if (state.sessionId && !state.finished) {
      safeWrite(STORAGE_KEYS.invalidate, {
        reason: 'pagehide',
        at: Date.now(),
        sessionId: state.sessionId,
      });
    }
  }

  function handleBeforeUnload() {
    if (state.sessionId && !state.finished) {
      safeWrite(STORAGE_KEYS.invalidate, {
        reason: 'reload',
        at: Date.now(),
        sessionId: state.sessionId,
      });
    }
  }

  function persistSnapshot() {
    const snap = {
      sessionId: state.sessionId,
      name: state.name,
      group: state.group,
      topic: state.topic,
      questions: state.questions,
      currentIndex: state.currentIndex,
      answers: state.answers,
      startedAt: state.startedAt,
      currentStartedAt: state.currentStartedAt,
      finishedAt: state.finishedAt,
      finished: state.finished,
      submitted: state.submitted,
      submitState: state.submitState,
    };
    safeWrite(STORAGE_KEYS.snapshot, snap);
    writeCookie('hotel_practice_live', JSON.stringify({
      sessionId: state.sessionId,
      currentIndex: state.currentIndex,
      finished: state.finished,
      t: Date.now(),
    }), 1);
  }

  function clearSnapshot() {
    safeWrite(STORAGE_KEYS.snapshot, null);
    writeCookie('hotel_practice_live', '', -1);
  }

  function resetInvalidation() {
    safeWrite(STORAGE_KEYS.invalidate, null);
  }

  function safeRead(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw || raw === 'null') return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function safeWrite(key, value) {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch {}
  }

  function cleanInput(value, max) {
    return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max);
  }

  function normalizeWord(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[“”"'.!?;,:[\]{}()]/g, '')
      .replace(/’/g, '')
      .replace(/^-+|-+$/g, '')
      .trim();
  }

  function tokenizeForCanvas(text) {
    const normalized = String(text || '').replace(/\r/g, '');
    const tokens = [];
    const parts = normalized.split(/(\n|\s+)/g).filter(Boolean);
    for (const part of parts) {
      if (part === '\n') {
        tokens.push({ raw: part, kind: 'newline' });
      } else if (/^\s+$/.test(part)) {
        tokens.push({ raw: part.replace(/\n/g, ''), kind: 'space' });
      } else {
        tokens.push({ raw: part, kind: 'word' });
      }
    }
    return tokens;
  }

  function trimLineEnd(line) {
    const copy = [...line];
    while (copy.length && copy[copy.length - 1].kind === 'space') {
      copy.pop();
    }
    return copy;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function createSessionId() {
    return `HTL-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  }

  function getNavigationType() {
    try {
      const nav = performance.getEntriesByType('navigation')[0];
      return nav ? nav.type : '';
    } catch {
      return '';
    }
  }

  function formatDuration(totalSec) {
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
  }

  function showToast(message) {
    clearTimeout(showToast.timer);
    dom.toast.textContent = message;
    dom.toast.classList.remove('hidden');
    showToast.timer = window.setTimeout(() => {
      dom.toast.classList.add('hidden');
    }, 2200);
  }

  function throttle(fn, wait) {
    let timer = 0;
    let savedArgs = null;
    return function throttled(...args) {
      if (timer) {
        savedArgs = args;
        return;
      }
      fn.apply(this, args);
      timer = window.setTimeout(() => {
        timer = 0;
        if (savedArgs) {
          fn.apply(this, savedArgs);
          savedArgs = null;
        }
      }, wait);
    };
  }

  function writeCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  }
})();
