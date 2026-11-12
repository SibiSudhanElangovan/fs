'use strict';
const express = require('express');
const Leave = require('../models/Leave');
const router = express.Router();
const DEFAULT_BALANCE = Object.freeze({ Casual: 12, Medical: 8 });
router.post('/apply', async (req, res, next) => {
  try {
    const employeeId = String(req.body.employeeId || '').trim();
    const type = req.body.type;
    const days = Number(req.body.days);
    if (!employeeId) return res.status(400).json({ message: 'Employee ID is required.' });
    if (!Object.hasOwn(DEFAULT_BALANCE, type)) return res.status(400).json({ message: 'Leave type must be Casual or Medical.' });
    if (!Number.isInteger(days) || days < 1 || days > 30) return res.status(400).json({ message: 'Days must be a whole number from 1 to 30.' });
    const used = await Leave.aggregate([{ $match: { employeeId, type } }, { $group: { _id: null, total: { $sum: '$days' } } }]);
    const remaining = DEFAULT_BALANCE[type] - (used[0]?.total || 0);
    if (days > remaining) return res.status(400).json({ message: `Insufficient ${type.toLowerCase()} leave balance. Remaining: ${Math.max(remaining, 0)} day(s).` });
    await Leave.create({ employeeId, type, days });
    res.status(201).json({ message: 'Leave applied successfully.', remaining: remaining - days });
  } catch (error) { next(error); }
});
router.get('/balance/:employeeId', async (req, res, next) => {
  try {
    const employeeId = String(req.params.employeeId || '').trim();
    const totals = await Leave.aggregate([{ $match: { employeeId } }, { $group: { _id: '$type', used: { $sum: '$days' } } }]);
    const used = { Casual: 0, Medical: 0 };
    totals.forEach((row) => { used[row._id] = row.used; });
    res.json({ employeeId, Casual: { total: DEFAULT_BALANCE.Casual, used: used.Casual, remaining: Math.max(0, DEFAULT_BALANCE.Casual - used.Casual) }, Medical: { total: DEFAULT_BALANCE.Medical, used: used.Medical, remaining: Math.max(0, DEFAULT_BALANCE.Medical - used.Medical) } });
  } catch (error) { next(error); }
});
module.exports = router;
