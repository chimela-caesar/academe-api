'use strict';
import express from 'express';

exports.notfound = (req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
};

exports.error = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
};
